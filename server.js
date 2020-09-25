require("dotenv").config();

const {
    createServer
} = require('http');
const cors = require("cors");
const express = require("express");
// const session = require("express-session");
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
        "https://chess-masta-test.herokuapp.com"
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
    app.use(express.static("client/build"));

// Add routes
app.use("/users", require("./routes/userRouter"));
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


const io = socketio(server);
const { setIO, addClient, removeClient } = require("./clients");
setIO(io);

// main connection handler for connected users
io.on('connection', (socket) => {

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
