import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, paginate, update, destroy } from "../../controllers/products.controller.js";
//import productManager from "../../data/fs/ProductManager.js";
import productManager from "../../data/mongo/managers/productsManager.mongo.js"
import isText from "../../middlewares/isText.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";


class ProductsRouter extends CustomRouter {
  init(){
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN"], isAdmin, create);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
