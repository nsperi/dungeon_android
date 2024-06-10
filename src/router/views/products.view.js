import { Router } from "express";
import productManager from "../../data/fs/ProductManager.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productManager.read();
    return res.render("products", { title: "PRODUCTS", products });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await productManager.readOne(pid);
    return res.render("details", { title: "DETAILS", product: one });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
