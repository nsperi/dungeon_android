import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'products';
const schema = new Schema(
    {
        title: { type: String, required: true, index: true },
        photo: { type: String, default: '/images/no_profile_photo.svg' },
        category: { type: String, default: 'comics', enum: ['comics', 'figures', 'movies and series', 'accessories', 'card games', 'board games', 'books', 'clothing', 'posters', 'consoles'], index: true },
        price: { type: Number, default: 1},
        stock: { type: Number, default: 1}
    },{
        timestamps: true
    }
)

schema.plugin(mongoosePaginate)

const ProductModel = model(collection, schema)

export default ProductModel