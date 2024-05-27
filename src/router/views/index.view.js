import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.use('/products', productsRouter)
viewsRouter.use('/users', usersRouter)

export default viewsRouter;

//00.52