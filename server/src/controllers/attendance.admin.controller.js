import Attendance from "../models/Attendance.js";
import User from "../models/User.js";


export const getAllAttendances = async (req, res) => {
  try {
    const asistencias = await Attendance.find().populate("user", "name email"); //reemplaza el campo user (que es solo un ID) por el documento completo del modelo User, pero solo traé los campos name y email.”
    res.json(asistencias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener asistencias" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const empleados = await User.find({ role: "empleado" });
    res.json(empleados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener empleados" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("name email role"); // Podés agregar más campos si querés
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    console.error("Error al buscar usuario por ID", error);
    res.status(500).json({ message: "Error interno al buscar usuario" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "Empleado no encontrado" });
    }

    if (user.role !== "empleado") {
      return res.status(403).json({ success: false, message: "Solo se pueden borrar empleados" });
    }

    // Borramos todas las asistencias del usuario
    await Attendance.deleteMany({ user: id });

    // Luego borramos al usuario
    await User.findByIdAndDelete(id);

    res.json({ success: true, message: "Empleado y asistencias eliminados correctamente" });
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
};
