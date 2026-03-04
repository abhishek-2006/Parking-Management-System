import express from "express";
import {
  getVehicles,
  checkInVehicle,
  checkOutVehicle,
  updateVehicle,
  deleteVehicle,
  undoCheckOut
} from "../controllers/parkingController.js";

const router = express.Router();

router.get("/vehicles", getVehicles);
router.post("/checkin", checkInVehicle);
router.put("/checkout/:id", checkOutVehicle);
router.put("/update/:id", updateVehicle);
router.delete("/delete/:id", deleteVehicle);
router.put("/undo/:id", undoCheckOut);

export default router;