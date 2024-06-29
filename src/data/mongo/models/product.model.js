import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    photo: { type: String, default: "/images/no_profile_photo.svg" },
    category: {
      type: String,
      default: "Comics",
      enum: [
        "Comics",
        "Figures",
        "Movies and Series",
        "Accessories",
        "Card Games",
        "Board Games",
        "Books",
        "Clothing",
        "Posters",
        "Consoles",
      ],
      index: true,
    },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

schema.plugin(mongoosePaginate);

const ProductModel = model(collection, schema);

export default ProductModel;
