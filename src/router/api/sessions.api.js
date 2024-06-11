import CustomRouter from "../CustomRouter.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { register, login, signout, profile } from "../../controllers/sessions.controller.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.read("/online", ["USER", "ADMIN"], passportCb("jwt"), profile);
    this.create("/signout", ["USER", "ADMIN"], signout);
  }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();