
var _clients = [];
var _io = null;

exports.setIO = function(socket) {
    _io = socket;
}

exports.getIO = function() {
    return _io;
}

exports.getClients = function() {
    return _clients;
}

exports.getClientByUID = function(uid) {
    for(var i=0; i<_clients.length; i++)
    {
        if (_clients[i].uid === uid)
            return _clients[i];
    }

    return false;
}

exports.addClient = function(data) {
    _clients.push(data);
}

exports.removeClient = function(id) {
    for(var i=0; i<_clients.length; i++)
    {
        if (_clients[i].id === id)
            _clients.splice(i,1);
    }
}

// const socketio = require("socket.io");

// const io = socketio(server);
// var users = [];

// // setup listeners for socket.io
// io.on('connection', (socket) => {

//     socket.on('userData', (userData) => {

//         users.push({
//             id: socket.id,
//             uid: userData.uid,
//             gid: userData.gid
//         });
//     });

//     socket.on('disconnect', () => {
//         for(var i=0; i<users.length; i++)
//         {
//             if (users[i].id === socket.id)
//                 users.splice(i,1);
//         }
//     });
// });