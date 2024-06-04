import { Router } from "express";
import homeRouter from "./home.view.js";
import cartsRouter from "./carts.view.js";
import chatRouter from "./chat.view.js";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import registerRouter from "./register.view.js";

const viewsRouter = Router();

viewsRouter.use('/home', homeRouter);
viewsRouter.use('/carts/', cartsRouter);
viewsRouter.use('/chat', chatRouter)
viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use('/register', registerRouter);

export default viewsRouter;

