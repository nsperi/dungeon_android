import { Router } from "express";
import userManager from "../../data/fs/UserManager.js";


const usersRouter = Router();

usersRouter.get("/", async(req, res, next)=>{
    try {
        const users = await userManager
    .read();
        return res.render("users", { users });
      } catch (error) {
        return next(error);
      }
    });

usersRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const one = await userManager.readOne(uid);
        return res.render("userdetails", { user: one });
    } catch (error) {
        return next(error);
    }
    });

export default usersRouter;