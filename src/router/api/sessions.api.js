import { Router } from "express";
import userManager from "../../data/mongo/managers/usersManager.mongo.js";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
  async (req, res, next) => {
    try {
      return res.json({ statusCode: 201, message: "Registered" });
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
      return res.json({ statusCode: 200, message: "Logged in" });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get("/online", async (req, res, next) => {
  try {
    if (req.session.online) {
      return res.json({
        statusCode: 200,
        message: "Is online",
        user_id: req.session.user_id,
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

sessionsRouter.post("/logout", (req, res, next)=>{
  try {
    if(req.session) {
        req.session.destroy()
        return res.json({
            statusCode: 200,
            message: "Signing out"
        })
    } else {
        return res.json({
            statusCode: 401,
            message: "Bad auth on logout"
        })
    }        
} catch (error) {
    return next(error)
}
})

export default sessionsRouter;
