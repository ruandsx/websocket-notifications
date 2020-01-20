import socketIOClient from "socket.io-client";

const socket = socketIOClient('http://192.168.0.6:3001');

function subscribeToNewNotification(subscribeFunction) {
  socket.on('new-notification', subscribeFunction);
}

function connect({ userId }) {
  socket.io.opts.query = {
    userId
  }
  socket.connect();
  setTimeout(()=>{
    alert(socket.connected);
  },3000)
}

function disconnect() {
  if(socket.connected){
    socket.disconnect();
  }
}

export { 
  connect,
  disconnect ,
  subscribeToNewNotification
};