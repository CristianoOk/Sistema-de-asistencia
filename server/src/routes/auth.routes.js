import express from "express";
import { registerAdmin, login,registerEmployee } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register-admin", registerAdmin);
router.post("/register-employee", registerEmployee)
router.post("/login", login)

export default router;
