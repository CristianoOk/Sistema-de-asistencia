import User from "../models/User.js";

const CLAVE_SECRETA_EMPRESA = "123456"; // Podrías moverla a .env si querés

export const registerAdmin = async (req, res) => {
  const { name, email, password, clave } = req.body;

  if (clave !== CLAVE_SECRETA_EMPRESA) {
    return res.status(401).json({ success: false, message: "Clave inválida" });
  }

  const userExistente = await User.findOne({ email });
  if (userExistente) {
    return res.status(400).json({ success: false, message: "El usuario ya existe" });
  }

  const nuevoAdmin = new User({
    name,
    email,
    password,
    role: "admin"
  });

  await nuevoAdmin.save();

  res.status(201).json({
    success: true,
    message: "Administrador creado correctamente",
    user: {
      id: nuevoAdmin._id,
      name: nuevoAdmin.name,
      email: nuevoAdmin.email,
      role: nuevoAdmin.role
    }
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Buscar el usuario por email
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: "Email o contraseña incorrectos" });
  }

  // Login correcto
  res.json({
    success: true,
    message: "Login exitoso",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

export const registerEmployee = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificamos si ya existe ese email
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ success: false, message: "El usuario ya existe" });
  }

  const newEmployee = new User({
    name,
    email,
    password,
    role: "empleado"
  });

  await newEmployee.save();

  res.status(201).json({
    success: true,
    message: "Empleado registrado correctamente",
    user: {
      id: newEmployee._id,
      name: newEmployee.name,
      email: newEmployee.email,
      role: newEmployee.role
    }
  });
};


