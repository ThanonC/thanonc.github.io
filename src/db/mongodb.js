import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.db;

await mongoose.connect(uri, {
  ssl: true,
  tlsInsecure: false,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  tlsCAFile: './path/to/ca.pem' // optional for self-signed certs
});

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