const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`Ùser with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", async (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("Desconectado: ", socket.id);
  });
});

server.listen(3003, () => {
  console.log("Running app");
});
