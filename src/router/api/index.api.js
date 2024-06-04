import { Router } from "express";
import productsRouter from "./products.api.js";
import userRouter from "./users.api.js";
import cartsRouter from "./carts.api.js";
import ticketsRouter from "./tickets.api.js";
import sessionsRouter from "./sessions.api.js";

const apiRouter = Router();

apiRouter.use('/cart', cartsRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/tickets', ticketsRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/sessions', sessionsRouter);

export default apiRouter;