const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.get("/", (req, res) => {
  res.send("SUP backend running 🚀");
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Chat relay
  socket.on("chat", (msg) => {
    io.emit("chat", msg);
  });

  // WebRTC signaling
  socket.on("offer", (offer) => {
    socket.broadcast.emit("offer", offer);
  });
  socket.on("answer", (answer) => {
    socket.broadcast.emit("answer", answer);
  });
  socket.on("candidate", (candidate) => {
    socket.broadcast.emit("candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`SUP server running on ${PORT}`));