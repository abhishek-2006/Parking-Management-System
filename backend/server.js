import  express  from "express";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import cors from "cors";
import { getDashboardStats } from "./controllers/dashboardController.js";
import parkingRoutes from "./routes/parking.js";
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
    app.locals.db = db;
    const vehiclesCollection = db.collection("vehicles");
    
    app.use("/api/dashboard", getDashboardStats);

    app.get("/api/vehicles", async (req, res) => {
        try {
            const vehicles = await vehiclesCollection.find().toArray();
            const now = new Date();

            const formattedVehicles = vehicles.map((v) => {
            // Calculate parked duration
            let parkedDuration = "N/A";
            if (v.status === "Parked" && v.checkInTime) {
                const entryTime = new Date(v.checkInTime);
                const diffMs = now - entryTime;
                const diffHrs = Math.floor(diffMs / 3600000);
                const diffMins = Math.floor((diffMs % 3600000) / 60000);
                parkedDuration = `${diffHrs}h ${diffMins}m`;
            }

            return {
                _id: v._id,
                plate: v.plate,
                slot: v.slot,
                type: v.type,
                status: v.status,
                checkInTime: v.checkInTime,
                checkOutTime: v.checkOutTime,
                parkedDuration,
            };
            });

            res.json(formattedVehicles);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch vehicles" });
        }
    });

    app.get("/", async (req, res) => {
        const collections = await db.listCollections().toArray();   
        res.send({ message: "PMS Backend Running", collections });
    });

    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});