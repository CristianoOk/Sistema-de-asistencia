import express from "express";
import { markEntry, markExit, getAttendanceStatus } from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/mark-entry", markEntry);
router.post("/mark-exit", markExit);
router.get("/status/:userId", getAttendanceStatus);

export default router;
