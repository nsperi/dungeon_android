import "dotenv/config.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import { engine } from "express-handlebars";

import indexRouter from "./src/router/index.router.js";
import socketCb from "./src/router/index.socket.js";
import errorHandler from "./src/middlewares/errorHandles.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import dbConnect from "./src/utils/dbConnect.util.js";

const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
    console.log("server ready on port " + port);
    await dbConnect();
  };
const nodeServer = createServer(server);
nodeServer.listen(port, ready);

const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);
export { socketServer };

server.engine("handlebars",engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname+'/src/views')

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"))
server.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 60 * 1000},
}));

//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);