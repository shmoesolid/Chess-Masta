const {
    createServer
} = require('http');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const morgan = require('morgan');
const compression = require('compression');

const normalizPort = port => parseInt(port, 10);
const PORT = normalizPort(process.env.PORT || 3001);

const app = express();
app.use(express.json());
app.use(cors());

app.disable('x-powered-by');
app.use(compression());
app.use(morgan('common'));
app.use(express.urlencoded({
    extended: true
}));

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    });

if (process.env.NODE_ENV === "production")
    app.use(express.static("client/build"));

const server = createServer(app);
server.listen(PORT, err => {
    if (err) throw err;

    console.log(`Server listening on port: ${PORT}`);
});

// Add routes
app.use("/users", require("./routes/userRouter"));