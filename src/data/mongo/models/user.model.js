import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer", index: true },
    verify: { type: Boolean, default: false },
    verifyCode: { type: String, required: true },
    photo: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

const User = model(collection, schema);
export default User;
