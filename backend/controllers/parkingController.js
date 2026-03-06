import { ObjectId } from "mongodb";

export const getVehicles = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const vehicles = await db.collection("vehicles").find().toArray();
    const now = new Date();

    const formatted = vehicles.map((v) => {
      if (v.status === "Exited" && v.parkedDuration) {
        return v;
      }
      
      let parkedDuration = "0h 0m";

      if (v.checkInTime) {
        const start = new Date(v.checkInTime);
        
        const end = (v.status === "Exited" && v.checkOutTime) 
          ? new Date(v.checkOutTime) 
          : now;

        const diffMs = end - start;
        const hours = Math.floor(diffMs / 3600000);
        const minutes = Math.floor((diffMs % 3600000) / 60000);
        
        parkedDuration = `${hours}h ${minutes}m`;
      }

      return { ...v, parkedDuration };
    });

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching vehicles:", err);
    res.status(500).json({ message: "Failed to fetch vehicles" });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { id } = req.params;
    const { plate, slot } = req.body;

    await db.collection("vehicles").updateOne(
      { _id: new ObjectId(id) },
      { $set: { plate, slot } }
    );
    res.json({message: "Updated Successfully"});    
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({message: "Update failed"});
  }
}

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

    const settings = await db.collection("settings").findOne({ type: "rates" });
    const defaultRates = { Motorcycle: 10, Hatchback: 20, Sedan: 30, SUV: 40, Van: 40, Coupe: 50, Convertible: 100, Truck: 80, Bus: 100 };
    
    // Use Nullish Coalescing to ensure currentRates is never undefined
    const currentRates = settings?.rates ?? defaultRates; 

    const vehicle = await db.collection("vehicles").findOne({ _id: new ObjectId(id) });

    if (!vehicle || vehicle.status !== "Parked") {
      return res.status(404).json({ message: "Vehicle not found or already exited" });
    }

    // 2. Calculate the final duration
    const checkOutTime = new Date();
    const checkInTime = new Date(vehicle.checkInTime);
    
    const diffMs = checkOutTime - checkInTime;
    // Rounding up to the nearest hour, minimum 0.5 for very short stays
    const totalHours = Math.max(0.5, Math.ceil(diffMs / 3600000));

    // Defensive check: if vehicle.type isn't in currentRates, default to 20
    const hourlyRate = currentRates[vehicle.type] || 20;
    const totalRevenue = totalHours * hourlyRate;

    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    const finalDuration = `${hours}h ${minutes}m`;

    // 3. Update the record
    await db.collection("vehicles").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: "Exited",
          checkOutTime: checkOutTime,
          parkedDuration: finalDuration,
          revenue: totalRevenue
        }
      }
    );

    // IMPORTANT: Return revenue so the frontend alert can display it!
    res.json({ 
      message: "Vehicle checked out successfully", 
      duration: finalDuration,
      revenue: totalRevenue 
    });
  } catch (err) {
    console.error("Checkout Error:", err);
    res.status(500).json({ message: "Check-out failed" });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { id } = req.params;

    await db.collection("vehicles").deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Vehicle record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Deletion failed" });
  }
};

export const undoCheckOut = async (req, res) => {
  try {    
    const db = req.app.locals.db;
    const { id } = req.params;
    const vehicle = await db.collection("vehicles").findOne({ _id: new ObjectId(id) });

    if (!vehicle || vehicle.status !== "Exited") {
      return res.status(404).json({ message: "Vehicle not found or not exited" });
    }
    await db.collection("vehicles").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: "Parked",
          checkOutTime: null,
          parkedDuration: null,
          revenue: null
        }
      }
    );
    res.json({ message: "Vehicle check-out undone successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Undo check-out failed" });
  }
}

export const editRates = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { rates } = req.body;
    await db.collection("settings").updateOne(
      { type: "rates" },
      { $set: { rates } },
      { upsert: true }
    );
    res.json({ message: "Rates updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update rates" });
  }
}