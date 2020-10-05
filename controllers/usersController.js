const nodemailer = require("nodemailer");
const EmailValidator = require("email-deep-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");

// email max send count
const MAX_SEND_COUNT = 3;

// setup email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.VALIDATOR_EMAIL_USER,
        pass: process.env.VALIDATOR_EMAIL_PASS
    }
});

const sendEmailCode = (email, code, res=null) =>
{
    transporter.sendMail(
        {
            from: process.env.VALIDATOR_EMAIL_USER,
            to: email,
            subject: "Your Validation Code for Chess-Masta",
            text: 
                "Welcome to Chess-Masta!\n\n"
                + "Please enter the following 6-digit code in the activation page:\n\n"
                + code
        },
        function(error, info) {
            if (error) {
                if (res !== null) res.status(500).json({msg: "Unable to send email, please contact site admin."});
                return console.log(error);
            }

            if (res !== null) res.json(info.response);
            console.log("Email sent to new user: "+ info.response);
        }
    );
}

const returnUserData = (res, data) => {

    // copy user data so we can change it
    var user = ({...data}._doc);
  
    // delete vitals
    delete user.email;
    delete user.password;
    user.activateCode = (user.activateCode !== null) ? true : false; // send back a bool instead of code
  
    // this is just so a bunch of bugs don't happen atm
    user.id = user._id;
  
    // return it
    return res.json(user);
};

module.exports = {

    login: async function(req, res) {
        try {
            const {
                email,
                password
            } = req.body;

            // validate
            if (!email || !password)
                return res.status(400).json({ msg: "Not all fields have been entered." });
        
            const user = await db.User.findOne({ email: email });
            if (!user)
                return res
                    .status(400)
                    .json({ msg: "No account with that email has been registered." });
        
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) 
                return res.status(400).json({ msg: "Invalid credentials." });
        
            const expiration = process.env.NODE_ENV !== 'production' ? 900000 : 604800000;
            const token = jwt.sign({
                id: user._id
                }, process.env.JWT_SECRET, {
                expiresIn: process.env.NODE_ENV !== 'production' ? '1d' : '7d',
            });
            res.cookie('token', token, {
                expires: new Date(Date.now() + expiration),
                secure: process.env.NODE_ENV === 'production' ? true : false, // use https if in production
                httpOnly: true,
            });
            returnUserData(res, user);

        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    activate: async function(req, res) {
        try {
            var id = req.user;
            var code = req.body.activateCode;
            var user = await db.User.findById(id);

            // code not valid
            if (user.activateCode !== code)
                return res
                    .status(400)
                    .json({ msg: "Invalid code." });

            // valid code, make null and return user data
            db.User.findByIdAndUpdate(id, {activateCode: null}, function(err, result) {
                if (err) return res.json(err);
                returnUserData(res, result);
            });

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    },

    resendActivation: async function(req, res) {
        try {
            var id = req.user;
            var user = await db.User.findById(id);
            var sendCount = user.activateSendCount;

            // no spammy spam
            if (sendCount >= MAX_SEND_COUNT)
                return res
                    .status(400)
                    .json({ 
                        msg: "You've reached your max number of email resends."
                            + "  If you still have not received an email, please"
                            + " contact the creators of the site." 
                    });

            // update send count
            db.User.findByIdAndUpdate(id, {activateSendCount: (sendCount+1) }, function(err, result) {
                if (err) console.log("UPDATE ERROR:", err);
            });

            // resend
            sendEmailCode(user.email, user.activateCode, res);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    },

    register: async function(req, res) {
        try {
            let {
                email,
                password,
                passwordCheck,
                displayName
            } = req.body;
        
            // validate
            if (!email || !password || !passwordCheck || !displayName)
                return res
                    .status(400)
                    .json({ msg: "Not all fields have been entered." });

            if (password.length < 7)
              return res
                .status(400)
                .json({ msg: "The password needs to be at least 8 characters long." });

            if (password !== passwordCheck)
              return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification." });

            // do a 'deep scan' on email to confirm more legit before even attempting to send
            const emailValidator = new EmailValidator({timeout: 5000, verifyMailbox: false});
            const { wellFormed, validDomain } = await emailValidator.verify(email);

            if (!wellFormed)
                return res
                    .status(400)
                    .json({ msg: "Your email address structure does not appear to be valid." });

            if (!validDomain)
                return res
                    .status(400)
                    .json({ msg: "Your email address domain does not appear to be valid." });
        
            // confirm email doesn't already exist
            const existingUser = await db.User.findOne({ email: email });
            if (existingUser)
              return res
                .status(400)
                .json({ msg: "An account with that email already exists." });
        
            // generate password hash and gen activation code for email
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            const activateCode = Math.random().toString().slice(2, 8); // 6 digit code
        
            const newUser = new db.User({
                email,
                password: passwordHash,
                displayName,
                activateCode
            });
            const savedUser = await newUser.save();
            res.json(savedUser); // send back ID

            // email code to user with no res
            sendEmailCode(email, activateCode);

        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    },

    logout: async function(req, res) {
        res.clearCookie('token');
        res.json({});
    },

    delete: async function(req, res) {
        try {
            const deletedUser = await db.User.findByIdAndDelete(req.user);
            res.json(deletedUser);
        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    },

    tokenIsValid: async function(req, res) {
        try {
            const token = req.cookies.token || "";
            if (!token) return res.json(false);
        
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            if (!verified) return res.json(false);
        
            const user = await db.User.findById(verified.id);
            if (!user) return res.json(false);
        
            return res.json(true);
        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    },

    getUser: async function(req, res) {

        // get and possibly return
        var user = await db.User.findById(req.user);
        returnUserData(res, user);
    },

    updateUser: async function(req, res) { // post

        try {
            // collect data
            var id = req.user;
            const data = {
                displayName,
                boardWhiteColor,
                boardBlackColor,
                boardBorderColor,
                blackOnBottom
            } = req.body;

            // valid string checks
            const pregHtmlHex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/i;
            if (!data.displayName) return res.status(409).json("invalid display name length");
            if (!data.boardWhiteColor.match(pregHtmlHex)) return res.status(409).json("invalid color code");
            if (!data.boardBlackColor.match(pregHtmlHex)) return res.status(409).json("invalid color code");
            if (!data.boardBorderColor.match(pregHtmlHex)) return res.status(409).json("invalid color code");
            
            // update it
            db.User.findByIdAndUpdate(id, data, function(err, result) {
                if (err) return res.json(err);
                returnUserData(res, result);
            });

        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

};
