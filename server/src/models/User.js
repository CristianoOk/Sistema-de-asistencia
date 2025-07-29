import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "empleado"],
    default: "empleado"
  }
});

export default mongoose.model("User", userSchema);
