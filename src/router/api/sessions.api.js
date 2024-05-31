import { Router } from "express";
import userManager from "../../data/mongo/UserManager.mongo.js";
import passport from "../../middlewares/passport.js";
import isAuth from "../../middlewares/isAuth.mid.js";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
  async (req, res, next) => {
    try {
      const data = req.body;
      const one = await userManager.create(data);
      return json({ statusCode: 201, message: "Registered" });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in",
        token: req.user.token,
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get("/online", isAuth, async (req, res, next) => {
  try {
    if (req.user.onLine) {
      return res.json({
        statusCode: 200,
        message: "Is online",
      });
    }
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("signout", async (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({ statusCode: 200, message: "Signed out" });
    }
    const error = new Error("Invalid credentials");
    error.statusCode = 403;
    throw error;
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
