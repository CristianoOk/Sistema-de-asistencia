import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); //process.env es una propiedad de process que contiene las variables de entorno disponibles para el proceso de Node.js.
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1); //Finaliza el proceso con código de error 1

  }
};
