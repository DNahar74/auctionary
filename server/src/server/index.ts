// //todo: (1) Configure and understand cors settings

// import { createServer } from "node:http";
// import next from "next";
// import { Server } from "socket.io";

// //* dev = false means the server is running in production mode
// const dev = process.env.NODE_ENV !== "production";

// //* hostname refers to the hostname (or domain) where the Next.js server will be available.
// const hostname = process.env.HOSTNAME || "localhost";

// //* port refers to the port where the Next.js server will be available.
// const port = 8080;

// // this creates a next server
// const app = next({ dev, hostname, port });
// const handler = app.getRequestHandler();

// app.prepare().then(() => {
//   const httpServer = createServer(handler);

//   const io = new Server<
//     ClientToServerEvents,
//     ServerToClientEvents,
//     InterServerEvents,
//     SocketData
//   >(httpServer, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     // ...
//   });

//   httpServer
//     .once("error", (err) => {
//       console.error(err);
//       process.exit(1);
//     })
//     .listen(port, () => {
//       console.log(`> Ready on http://${hostname}:${port}`);
//     });
// });

import { Server } from "socket.io";
import http from "http";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "../types/types";

const hostname = process.env.HOSTNAME || "localhost";
const port = 8080;
const httpServer = http.createServer();

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>( httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("hello", () => {
    console.log("Message received");
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
