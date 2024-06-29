import dotenv from "dotenv";
dotenv.config();

import environment from "./src/utils/env.util.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "express-compression";

import argsUtil from "./src/utils/args.util.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { engine } from "express-handlebars";

import indexRouter from "./src/router/index.router.js";
import socketCb from "./src/router/index.socket.js";
import errorHandler from "./src/middlewares/errorHandles.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import dbConnect from "./src/utils/dbConnect.util.js";

const server = express();
const port = environment.PORT || argsUtil.p;
const ready = async () => {
  console.log("server ready on port " + port);
  //await dbConnect();
};
server.listen(port, ready);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
// server.use(
//   session({
//     store: new MongoStore({ mongoUrl: process.env.MONGO_URI, ttl: 60 * 60 }),
//     secret: process.env.SECRET_SESSION,
//     resave: true,
//     saveUninitialized: true,
//   })
// );
server.use(cors({ origin: true, credentials: true }));
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
