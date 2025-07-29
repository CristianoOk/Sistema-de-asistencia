import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api", adminRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido al backend de Asistencia");
});

export default app;
