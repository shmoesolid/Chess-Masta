
// centralized client handler for socketio
// listeners established in server.js
// not the best way to do this maybe but this is the only way
// i could think to where i could merge api routes with client updating
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

    // make sure we actually received something
    if (!uid) return false;

    // make sure it's a string
    if (typeof uid !== 'string')
        uid = uid.toString();

    // go through and get the right client if exists
    for(var i=0; i<_clients.length; i++)
    {
        if (_clients[i].uid === uid)
            return _clients[i];
    }

    // nope
    return false;
}

exports.addClient = function(data) {
    _clients.push(data);
}

exports.removeClient = function(id) {
    for(var i=0; i<_clients.length; i++)
    {
        if (_clients[i].id == id)
            _clients.splice(i,1);
    }
}
