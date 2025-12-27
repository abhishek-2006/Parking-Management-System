import  express  from "express";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then((db) => {
    app.get("/", async (req, res) => {
        const collections = await db.listCollections().toArray();   
        res.send({ message: "PMS Backend Running", collections });
    });

    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
