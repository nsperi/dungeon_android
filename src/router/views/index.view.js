import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import cartsRouter from "./carts.view.js";
import chatRouter from "./chat.view.js";
import registerRouter from "./register.view.js";

const viewsRouter = Router();

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/carts/", cartsRouter);
viewsRouter.use("/chat", chatRouter);
viewsRouter.use("/register", registerRouter);
viewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("index", { title: "The Android's Dungeon" });
  } catch (error) {
    return next(error);
  }
});
viewsRouter.get("/chat", async(req,res,next)=> {
  try {
    return res.render("chat", { title: "CHAT" })
  } catch (error) {
    return next(error)
  }
})

export default viewsRouter;

