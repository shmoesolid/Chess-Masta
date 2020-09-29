require("dotenv").config();

const {
    createServer
} = require('http');
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const compression = require('compression');
const routes = require("./routes");
const socketio = require("socket.io");

const normalizPort = port => parseInt(port, 10);
const PORT = normalizPort(process.env.PORT || 3001);

const app = express();

app.disable('x-powered-by');
app.use(cors({
    credentials: true,
    origin: [
        "http://localhost:3000", 
        "http://localhost:3001",
        "https://chess-masta.herokuapp.com",
        "https://chess-masta-test.herokuapp.com",
        "http://chess-masta.herokuapp.com",
        "http://chess-masta-test.herokuapp.com"
    ],
}));
app.use(compression());
app.use(morgan('common'));
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "production")
{
    app.use(express.static("client/build"));

    // force ssl redirect test
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https')
            return res.redirect(['https://', req.get('Host'), req.url].join(''));

        return next();
    });
}
    

// Add routes
app.use(routes);

// Mongoose ORM
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    }
);

const server = createServer(app);
server.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server listening on port: ${PORT}`);
});

// socket.io server setup attached to listen server
// this handles current connections in a centralized module
const { setIO, getIO, addClient, removeClient } = require("./clients");
setIO(socketio(server)); // set for allowing gamesController to emit msgs

// main connection handler for connected users
getIO().on('connection', (socket) => {

    socket.on('userData', (userData) => {
        addClient({
            id: socket.id,
            uid: userData.uid,
            gid: userData.gid
        });
    });

    socket.on('disconnect', () => {
        removeClient(socket.id);
    });
});

