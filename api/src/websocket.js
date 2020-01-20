const socketio = require('socket.io');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);
    io.on('connection', socket=> {
      const { userId } = socket.handshake.query;
      connections.push({
        id: socket.id,
        userId,
      })

    console.log(userId)

    })
}

exports.findConnections = (userId) => {
  return connections.filter(connection => {
    return connection.userId == userId;
  })
}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection =>{
    io.to(connection.id).emit(message, data)
  })
}