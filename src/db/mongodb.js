import mongoose from "mongoose";
const uri = "mongodb+srv://thanon:1utPf5axUbWoU7Wd@cluster0.bp4h51q.mongodb.net/user-base";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions);

const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const collection = new mongoose.model("users", loginSchema);