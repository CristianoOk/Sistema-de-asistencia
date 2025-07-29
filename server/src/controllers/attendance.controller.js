import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

// Para obtener la fecha de hoy en formato "YYYY-MM-DD"
const getTodayDate = () => {
  return new Date().toISOString().split("T")[0]; //"2025-07-19T18:35:42.123Z" y el ".split("T")[0]", sirve para quedarte con la primera parte antes de la T.
};

// Para obtener hora en "HH:MM"
const getCurrentTime = () => {
  const now = new Date(); //"14:30:25 GMT-0300
  return now.toTimeString().slice(0, 5); //.slice(0, 5) Corta los primeros 5 caracteres del string resultante:"14:30"
};

export const markEntry = async (req, res) => {
  const { userId } = req.body;
  const today = getTodayDate();

  let record = await Attendance.findOne({ user: userId, date: today });

  if (record?.entryTime) {
    return res.status(400).json({ success: false, message: "Ya marcaste la entrada hoy" });
  }

  if (!record) {
    record = new Attendance({ user: userId, date: today });
  }

  record.entryTime = getCurrentTime();
  await record.save();

  res.json({ success: true, message: "Entrada registrada", record });
};

export const markExit = async (req, res) => {
  const { userId } = req.body;
  const today = getTodayDate();

  const record = await Attendance.findOne({ user: userId, date: today });

  if (!record || !record.entryTime) {
    return res.status(400).json({ success: false, message: "Primero debes marcar la entrada" });
  }

  if (record.exitTime) {
    return res.status(400).json({ success: false, message: "Ya marcaste la salida hoy" });
  }

  record.exitTime = getCurrentTime();
  await record.save();

  res.json({ success: true, message: "Salida registrada", record });
};

export const getAttendanceStatus = async (req, res) => {
  const { userId } = req.params;
  const today = new Date().toISOString().split("T")[0];

  try {
    const record = await Attendance.findOne({ user: userId, date: today });

    const entryMarked = !!record?.entryTime; //Si encuentra algo dentro de record.entryTime => le pone true como valor a esta const entryMarked; y en el caso de estar null o no contener o no existir etc. => le asigna false. Para eso sirven "!!"
    const exitMarked = !!record?.exitTime;

    res.json({ entryMarked, exitMarked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al verificar estado de asistencia" });
  }
};

