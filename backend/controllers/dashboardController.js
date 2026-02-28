export const getDashboardStats = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const vehiclesCollection = db.collection("vehicles");
    const lot = await db.collection("lots").findOne({ _id: "lot42" });

    if (!lot) {
      return res.status(404).json({ message: "Parking lot not found" });
    }

    const totalCapacity = lot.totalSpaces;
    const occupiedSpaces = await vehiclesCollection.countDocuments({ status: "Parked" });
    const availableSpaces = totalCapacity - occupiedSpaces;

    res.json({
      totalCapacity,
      occupiedSpaces,
      availableSpaces,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};