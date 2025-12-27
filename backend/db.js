import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export const connectDB = async () => {
    await client.connect();
    console.log("MongoDB Connected");
    return client.db("pms");
};
