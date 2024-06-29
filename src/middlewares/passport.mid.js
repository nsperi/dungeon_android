import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import userManager from "../data/mongo/managers/usersManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import UsersDTO from "../dto/users.dto.js";
import authRepository from "../repositories/auth.rep.js";
import crypto from "crypto";
import sendEmail from "../utils/mailing.util.js";
import CustomError from "../utils/errors/CustomError.js";
import errors from "../utils/errors/errors.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let user = await authRepository.readByEmailRepository(email);
        if (user) {
          const error = new CustomError(errors.invalidCredentials);
          return done(null, null, error);
        }
        const data = new UsersDTO(req.body);
        user = await authRepository.create(data);
        await sendEmail({
          to: email,
          name: user.name,
          code: user.verifyCode,
        });
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
          const error = new CustomError(errors.auth);
          return done(error);
        }
        const verify = verifyHash(password, one.password);
        if (verify) {
          //req.session.name = one.name;
          //req.session.email = email;
          //req.session.online = true;
          //req.session.role = one.role;
          //req.session.photo = one.photo;
          //req.session.user_id = one._id;
          const user = {
            name: one.name,
            email,
            role: one.role,
            photo: one.photo,
            _id: one._id,
            online: true,
          };
          const token = createToken(user);
          user.token = token;
          return done(null, user);
        }
        const error = new CustomError(errors.invalidCredentials);
        return done(error);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: process.env.SECRET_JWT,
    },
    (data, done) => {
      try {
        if (data) {
          return done(null, data);
        } else {
          const error = new CustomError(errors.forbidden);
          return done(error);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
