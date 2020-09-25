
class Socket
{
    constructor(socket)
    {
        this.io = socket;
        this.users = [];
    }

    eventSetup() {
        this.io.on('connection', (socket) => {

            socket.on('userData', (userData) => {
        
                this.users.push({
                    id: socket.id,
                    uid: userData.uid,
                    gid: userData.gid
                });
            });
        
            socket.on('disconnect', () => {
                for(var i=0; i<this.users.length; i++)
                {
                    if (this.users[i].id === socket.id)
                        this.users.splice(i,1);
                }
            });
        });
    }
}

module.exports = Socket;