const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  try {
    let {
      email,
      password,
      passwordCheck,
      displayName
    } = req.body;

    // validate
    if (!email || !password || !passwordCheck || !displayName)
      return res.status(400).json({
        msg: "Not all fields have been entered."
      });
    if (password.length < 7)
      return res
        .status(400)
        .json({
          msg: "The password needs to be at least 8 characters long."
        });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({
          msg: "Enter the same password twice for verification."
        });

    const existingUser = await User.findOne({
      email: email
    });
    if (existingUser)
      return res
        .status(400)
        .json({
          msg: "An account with that email already exists."
        });

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    // validate
    if (!email || !password)
      return res.status(400).json({
        msg: "Not all fields have been entered."
      });

    const user = await User.findOne({
      email: email
    });
    if (!user)
      return res
        .status(400)
        .json({
          msg: "No account with that email has been registered."
        });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({
      msg: "Invalid credentials."
    });

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
    res.status(500).json({
      error: err.message
    });
  }
});

router.get("/logout", auth, async (req, res) => {
  res.clearCookie('token');
  res.json({});
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

router.get("/tokenIsValid", async (req, res) => {
  try {
    const token = req.cookies.token || "";
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

router.get("/", auth, async (req, res) => {
  var user = await User.findById(req.user);

  // return user data
  //res.json(user);
  returnUserData(res, user);
});

const returnUserData = (res, data) => {

  // copy user data so we can change it
  var user = ({...data}._doc);

  // delete vitals
  delete user.email;
  delete user.password;

  // this is just so a bunch of bugs don't happen atm
  user.id = user._id;

  // return it
  return res.json(user);
};

module.exports = router;