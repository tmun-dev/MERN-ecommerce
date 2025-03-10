import express from "express";
import { getAllOrders, getUserOrders, updateOrderStatus } from "../controllers/order.controller.js";
import { authenticateToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/all", authenticateToken, isAdmin, getAllOrders);
router.get("/user", authenticateToken, getUserOrders);
router.patch("/:orderId/status", authenticateToken, isAdmin, updateOrderStatus);

export default router; 