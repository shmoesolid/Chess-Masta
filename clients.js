
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
    for(var i=0; i<_clients.length; i++)
    {
        console.log(_clients[i].uid, "vs", uid.toString());
        if (_clients[i].uid === uid.toString())
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
