import { Router } from "express";
import userManager from "../../data/mongo/managers/usersManager.mongo.js"
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidUser from "../../middlewares/isValidUser.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  isValidData,
  isValidEmail,
  async (req, res, next) => {
    try {
      const data = req.body;
      await userManager.create(data);
      return res.json({ statusCode: 201, message: "Registered!" });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/login",
  isValidUser,
  isValidPassword, 
  async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const one = await userManager.readByEmail(email);
    if (one.password === password) {
      req.session.name = one.name;
      req.session.email = email;
      req.session.online = true;
      req.session.role = one.role;
      req.session.user_id = one._id;
      return res.json({ statusCode: 200, message: "Logged in!" });
    }
    return res.json({ statusCode: 401, message: "Bad auth!" });
  } catch (error) {
    return next(error);
  }
});
sessionsRouter.get("/online", async (req, res, next) => {
  try {
    if (req.session.online) {
      return res.json({
        statusCode: 200,
        message: "Is online!",
        user_id: req.session.user_id,
      });
    }
    return res.json({
      statusCode: 401,
      message: "Bad auth!",
    });
  } catch (error) {
    return next(error);
  }
});
sessionsRouter.post("/signout", (req, res, next) => {
  try {
    req.session.destroy();
    return res.json({ statusCode: 200, message: "Signed out!" });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;