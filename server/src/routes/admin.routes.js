import express from "express";
import { getAllAttendances, getAllUsers, getUserById, deleteEmployee } from "../controllers/attendance.admin.controller.js";

const router = express.Router();

router.get("/attendances", getAllAttendances);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.delete("/employees/:id", deleteEmployee);

export default router;
