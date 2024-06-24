import argsUtil from "../utils/args.util.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.util.js";

const persistence = argsUtil.persistence;

class UsersDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.name = data.name;
    this.email = data.email;
    this.password = createHash(data.password);
    this.role = data.role || "customer";
    this.photo = data.photo || "../../public/images/no_photo_user.jpg";
  }
}

export default UsersDTO;
