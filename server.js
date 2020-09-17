const {
    createServer
} = require('http');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require('morgan');
const compression = require('compression');
require("dotenv").config();

const normalizPort = port => parseInt(port, 10);
const PORT = normalizPort(process.env.PORT || 3001);

const app = express();

const server = createServer(app);

server.listen(PORT, err => {
    if (err) throw err;

    console.log(`Server listening on port: ${PORT}`);
});

if (process.env.NODE_ENV === "production")
    app.use(express.static("client/build"));

app.use(express.json());
app.use(cors());
app.disable('x-powered-by');
app.use(compression());
app.use(morgan('common'));
app.use(express.urlencoded({
    extended: true
}));

// Add routes
app.use("/users", require("./routes/userRouter"));

// Mongoose ORM
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    });