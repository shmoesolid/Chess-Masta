const {
    createServer
} = require('http');
const express = require("express");
const path = require('path');
const morgan = require('morgan');
const compression = require('compression');

const normalizPort = port => parseInt(port, 10);
const PORT = normalizPort(process.env.PORT || 3000);

const app = express();

app.disable('x-powered-by');
app.use(compression());
app.use(morgan('common'));

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});

const server = createServer(app);

server.listen(PORT, err => {
    if (err) throw err;

    console.log('Server started');
});