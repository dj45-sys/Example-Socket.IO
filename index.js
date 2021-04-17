const express = require("express");
const app = express();
const path = require("path");

//Settings

app.set("port", process.env.PORT || 5500);

//Static Files

app.use(express.static(path.join(__dirname, "public")));

//Start Server

const server = app.listen(app.get("port"), () => {
  console.log(`Server On Port ${app.get("port")}`);
});

//WebSockets

const socketIO = require("socket.io");
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New Connection", socket.id);

  socket.on('chat:message', (data)=>{
    io.sockets.emit('chat:message', data)
  })
  socket.on('chat:typing', (data)=>{
    socket.broadcast.emit('chat:typing', data);
  })
});
