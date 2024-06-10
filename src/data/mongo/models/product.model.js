import { Schema, Types, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    text: { type: String, required: true },
    category: {
      type: String,
      default: "customer",
      enum: ["customer", "done"],
      index: true,
    },
    user_id: {
      type: Types.ObjectId,
      ref: "users",
      index: true,
      required: true,
    },
    user: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

schema.pre("find", function () {
  this.populate("user_id", "email photo -_id");
});
schema.pre("findOne", function () {
  this.populate("user_id", "email");
});


const Product = model(collection, schema);
export default Product;