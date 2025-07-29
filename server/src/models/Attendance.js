import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: String, // usamos formato "YYYY-MM-DD"
    required: true
  },
  entryTime: String,  // por ejemplo: "08:13"
  exitTime: String     // por ejemplo: "17:42"
});

export default mongoose.model("Attendance", attendanceSchema);
