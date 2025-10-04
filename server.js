const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on("connection", socket => {
console.log("User connected:", socket.id);

socket.on("chat", msg => {
io.emit("chat", msg);
});

socket.on("offer", offer => {
socket.broadcast.emit("offer", offer);
});

socket.on("answer", answer => {
socket.broadcast.emit("answer", answer);
});

socket.on("ice-candidate", cand => {
socket.broadcast.emit("ice-candidate", cand);
});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running on port " + PORT));
	
