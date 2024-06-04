import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from 'cookie-parser';
import session from "express-session";
import fileStore from 'session-file-store';
import MongoStore from "connect-mongo";

import socketCallback from "./src/websocket/index.socket.js";
import chatSocketCallback from './src/websocket/chat.socket.js';

import dbConnect from "./src/utils/dbConnect.js";
import morgan from "morgan";
import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHander from "./src/middlewares/pathHandler.mid.js";

import path from "path";

import { engine } from "express-handlebars";
import __dirname from "./utils.js";

//Server
const server = express();
const port = 8080;
const ready = async () => {
    console.log("server ready on port " + port);
    await dbConnect();
}

const nodeServer = createServer(server);
const io = new Server(nodeServer);

nodeServer.listen(port, ready);

io.on('connection', socketCallback);

//SOCKET NAMESPACES
//Realtime products Namespace
const productsNamespace = io.of('/products');
productsNamespace.on('connection', socketCallback);
//Realtime users Namespace
const usersNamespace = io.of('/users');
usersNamespace.on('connection', socketCallback);
//Chat Namespace
const chatNamespace = io.of('/chat');
chatNamespace.on('connection', chatSocketCallback);

//Export del servidor de socket
export { io };

// Templates engine (Handlebars)
server.engine("handlebars",engine());
server.set('view engine', 'handlebars')
server.set('views', __dirname+'/src/views')


//middlewaress
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')))
server.use(cookieParser(process.env.SECRET_COOKIE))
server.use(morgan("dev"));

//const FileSession = fileStore(session)
server.use(
    session({
        // store: new FileSession({
        //     path: "./src/data/fs/files/sessions",
        //     ttl:60 * 60,
        // }),
        store: new MongoStore({ 
            mongoUrl: process.env.MONGO_URI, 
            ttl: 60 * 60 }),
        secret: process.env.SECRET_SESSION,
        resave: true,
        saveUninitialized: true,
        //cookie: {maxAge: 60 * 60 * 1000},
    }));

//Router
server.use("/", indexRouter);

//Error and Path handling
server.use(errorHandler);
server.use(pathHander);
