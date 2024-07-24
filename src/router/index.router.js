//import { Router } from "express";
import sendEmail from "../utils/mailing.util.js";
import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.api.js";
import fork from "child_process";
//import viewsRouter from "./views/index.view.js";

class IndexRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], (req, res, next) => {
      // Manejar la solicitud a la ruta raíz aquí
      res.send("¡Hola desde la ruta raíz!");
    });
    this.use("/api", apiRouter);
    this.create("/api/nodemailer", ["PUBLIC"], async (req, res, next) => {
      try {
        const { email, name } = req.body;
        await sendEmail({ to: email, name });
        return res.message200("Email sent");
      } catch (error) {
        next(error);
      }
    });
    this.read("/fork", ["PUBLIC"], (req, res, next) => {
      try {
        const childProcess = fork("./src/processes/sum.proc.js");
        childProcess.send("start");
        childProcess.on("message", (result) => {
          return res.json({ result });
        });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/simplex", ["PUBLIC"], (req, res, next) => {
      try {
        let total = 1;
        for (let i = 1; i < 100; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/complex", ["PUBLIC"], (req, res, next) => {
      try {
        let total = 1;
        for (let i = 1; i < 2000000000; i++) {
          total = i * i;
        }
        return res.send({ total });
      } catch (error) {
        return next(error);
      }
    });
  }
}

//indexRouter.use("/api", apiRouter);
//indexRouter.use("/", viewsRouter);

const indexRouter = new IndexRouter();
export default indexRouter.getRouter();
