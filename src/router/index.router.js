//import { Router } from "express";
import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.api.js";
import fork from "child_process"
//import viewsRouter from "./views/index.view.js";

class IndexRouter extends CustomRouter{
    init() {
        this.use("/api", apiRouter)
        this.read("/fork", ["PUBLIC"], (req, res, next)=>{
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
    }
};

//indexRouter.use("/api", apiRouter);
//indexRouter.use("/", viewsRouter);

const indexRouter = new IndexRouter()
export default indexRouter.getRouter();