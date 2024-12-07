import { createServer } from "node:http";
import { Server } from "socket.io";

const hostname = "localhost";
const port = 8080;

const initializeServer = async () => {
  console.log("Initializing resources...");
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async setup
  // This will include the things to so before a connection is established
  // Like DB connect and session validation
  // Taking things from environment variables
  console.log("Resources initialized!");
}

const startServer = async () => {
  await initializeServer();

  const HTTPServer = createServer((req, res) => {
    res.writeHead(200);
    res.end(`Socket.IO server is running at http://${hostname}:${port}`);
  });

  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(HTTPServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.emit("noArg");
    socket.emit("basicEmit", 1, "2", Buffer.from([3]));
    socket.emit("withAck", "4", (e) => {
      // e is inferred as number
    });

    // handles hello 
    socket.on("hello", () => {
      // ...
    });
  
    // works when broadcast to all
    io.emit("noArg");
  
    // works when broadcasting to a room
    io.to("room1").emit("basicEmit", 1, "2", Buffer.from([3]));
  });
}