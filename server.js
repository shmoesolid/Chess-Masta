const {
    createServer
} = require('http');
const express = require("express");
//const path = require('path');
const routes = require("./routes");
const morgan = require('morgan');
const compression = require('compression');

const normalizPort = port => parseInt(port, 10);
const PORT = normalizPort(process.env.PORT || 3000);

const app = express();

app.disable('x-powered-by');
app.use(compression());
app.use(morgan('common'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production")
    app.use(express.static("client/build"));

// Add routes, both API and view
app.use(routes);

const server = createServer(app);
server.listen(PORT, err => {
    if (err) throw err;

    console.log('Server started');
});
