import socketIOClient from "socket.io-client";

function connect(userId) {
  const socket = socketIOClient(`http://localhost:3001?userId=${userId}`);
  socket.connect();
  return socket;
}

function subscribeToNewNotification(socket, subscribeFunction) {
  if (socket === "") return;
  socket.on("new-notification", subscribeFunction);
}

function disconnect(socket) {
  if (socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect, subscribeToNewNotification };
