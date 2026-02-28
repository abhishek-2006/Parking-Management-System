import express from "express";
import {
  getVehicles,
  checkInVehicle,
  checkOutVehicle
} from "../controllers/parkingController.js";

const router = express.Router();

router.get("/vehicles", getVehicles);
router.post("/checkin", checkInVehicle);
router.put("/checkout/:id", checkOutVehicle);

export default router;