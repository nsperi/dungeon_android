import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userManager from "../data/mongo/UserManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, name, email, password, done) => {
      try {
        if (!name || !email || !password) {
          const error = new Error("Please enter all data");
          error.statusCode = 404;
          return done(error);
        }
        const one = await userManager.readByEmail(email);
        if (one) {
          const error = new Error("Bad auth");
          error.statusCode = 401;
          return done(error);
        }
        const hashPassword = createHash(password);
        req.body.password = hashPassword;
        const user = await userManager.create(req.body);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const one = await userManager.readByEmail(email);
        if (!one) {
          const error = new Error("Bad auth");
          error.statusCode = 401;
          return done(error);
        }
        const verify = verifyHash(password, one.password);
        if (verify) {
          const data = { email, rol: one, online: true };
          const token = createToken(data);
          one.token = token;
          return done(null, one);
        }
        const error = new Error("Bad auth");
        error.statusCode = 401;
        return done(error);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
