require("dotenv").config();

const { createServer } = require('http');
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const compression = require('compression');
const routes = require("./routes");

const normalizPort = port => parseInt(port, 10);
const PORT = normalizPort(process.env.PORT || 3001);

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(compression());
app.use(morgan('common'));
server.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));

// Add routes
app.use("/users", require("./routes/userRouter"));
app.use(routes);

// Mongoose ORM
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING, 
    {
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