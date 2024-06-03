import { Router } from "express";
import userManager from "../../data/mongo/managers/usersManager.mongo.js";

const sessionsRouter = Router();

sessionsRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const one = await userManager.readByEmail(email);
    if (one.password === password) {
      req.session.email = email;
      req.session.role = one.role;
      return res.json({ statusCode: 200, message: "Logged in" });
    }
    return res.json({ statusCode: 401, message: "Bad auth" });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/online", async (req, res, next) => {
  try {
    if (req.session.online) {
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

sessionsRouter.post("/signout", (req, res, next)=>{
    try {
        req.session.destroy()
        return res.json({statusCode:200, message:"Signed out"})
    } catch (error) {
        return next(error)
    }
})

export default sessionsRouter;
