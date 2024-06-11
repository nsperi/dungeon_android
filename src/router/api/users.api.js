import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy } from "../../controllers/users.controller.js";
//import userManager from "../../data/fs/UserManager.js"
import userManager from "../../data/mongo/managers/usersManager.mongo.js"
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from "../../middlewares/isPhoto.mid.js";


class UsersRouter extends CustomRouter {
  init() {
    this.create("/", uploader.single("photo"), isPhoto, create);
    this.read("/", read);
    this.read("/:uid", readOne);
    this.update("/:uid", update);
    this.destroy("/:uid", destroy);
  }
}

const usersRouter = new UsersRouter();

export default usersRouter.getRouter();