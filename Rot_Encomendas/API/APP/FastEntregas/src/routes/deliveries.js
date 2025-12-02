// src/routes/deliveries.js
import express from "express";
import {
  listDeliveries,
  getDelivery,
  createDelivery,
  updateDelivery,
  deleteDelivery,
} from "../controllers/deliveriesController.js";

const router = express.Router();

router.get("/", listDeliveries);
router.get("/:id", getDelivery);
router.post("/", createDelivery);
router.put("/:id", updateDelivery);
router.delete("/:id", deleteDelivery);

export default router;
