import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const persistence = argsUtil.persistence;

class ProductsDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.title = data.title;
    this.photo = data.photo || "../../public/images/no_photo_user.jpg";
    this.category = data.category;
    this.price = data.price;
    this.stock = data.stock;
  }
}

export default ProductsDTO;
