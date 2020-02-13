const socketio = require("socket.io");

let io;
let connections = [];

exports.setupWebsocket = server => {
  io = socketio(server);

  io.on("connection", socket => {
    socket.on("disconnect", () => {
      console.log(socket.id + " desconectado");
      connections = connections.filter(connection => {
        return connection.id != socket.id;
      });
    });
    const { userId } = socket.handshake.query;
    connections.push({
      id: socket.id,
      userId
    });
    console.log(connections);
  });
};

exports.findConnections = userId => {
  return connections.filter(connection => {
    return connection.userId == userId;
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
