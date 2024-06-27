import { config } from "dotenv";
import argsUtil from "./args.util.js";

const { env } = argsUtil;

const path = env === "prod" ? "./.env.prod" : "./.env.dev";
config({ path });

const environment = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  SECRET_SESSION: process.env.SECRET_SESSION,
  SECRET_JWT: process.env.SECRET_JWT,
  GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
  GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
};

export default environment;
