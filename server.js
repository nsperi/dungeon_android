import "dotenv/config.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import path from "path";

import indexRouter from "./src/router/index.router.js";
import socketCb from "./src/router/index.socket.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHander from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import dbConnect from "./src/utils/dbConnect.util.js";

const server = express();
const port = process.env.PORT || 9000;
const ready = async () => {
  console.log("server ready on port " + port);
  await dbConnect();
};
const nodeServer = createServer(server);
server.listen(port, ready);
const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));
server.use(express.static(path.join(__dirname, "public")));

//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHander);
