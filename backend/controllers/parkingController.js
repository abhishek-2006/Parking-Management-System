import { ObjectId } from "mongodb";
export const getVehicles = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const vehiclesCollection = db.collection("vehicles");

    const vehicles = await vehiclesCollection.find().toArray();
    const now = new Date();

    const formatted = vehicles.map((v) => {
      let parkedDuration = "N/A";
      const start = new Date(v.checkInTime);
      const end = v.status === "Parked" ? now : new Date(v.checkOutTime);

      if (v.checkInTime && (v.status === "Parked" || v.checkInTime)) {
        const diffMs = end - start;
        const hours = Math.floor(diffMs / 3600000);
        const minutes = Math.floor((diffMs % 3600000) / 60000);
        parkedDuration = `${hours}h ${minutes}m`;
      }

      return {
        ...v,
        parkedDuration
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching vehicles:", err);
    res.status(500).json({ message: "Failed to fetch vehicles" });
  }
};

export const checkInVehicle = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const vehiclesCollection = db.collection("vehicles");

    const { plate, slot, type } = req.body;

    if (!plate || !slot || !type) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await vehiclesCollection.findOne({ slot, status: "Parked" });
    if (existing) {
      return res.status(400).json({ message: "Slot already occupied" });
    }

    const newVehicle = {
      plate,
      slot,
      type,
      status: "Parked",
      checkInTime: new Date(),
      checkOutTime: null
    };

    await vehiclesCollection.insertOne(newVehicle);

    res.status(201).json({ message: "Vehicle checked in successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Check-in failed" });
  }
};

export const checkOutVehicle = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { id } = req.params;
    const result = await db.collection("vehicles").updateOne(
      { _id: new ObjectId(id), status: "Parked" },
      {
        $set: {
          status: "Exited",
          checkOutTime: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Vehicle not found or already exited" });
    }

    res.json({ message: "Vehicle checked out successfully" });
  } catch (err) {
    console.error("Error checking out vehicle:", err);
    res.status(500).json({ message: "Check-out failed" });
  }
};