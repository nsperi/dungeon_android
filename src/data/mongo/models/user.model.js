import { Schema, model } from 'mongoose'

const collection = 'users'

const schema = new Schema({

    name: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    photo: { type: String, default: '/images/no_profile_photo.svg' },
    role: { type: String, default: 'customer', enum: ['customer', 'admin'], index: true }

},{
    timestamps: true
});

const UserModel = model(collection, schema)
export default UserModel