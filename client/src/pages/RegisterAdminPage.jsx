import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function RegisterAdminPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/register-admin", {
        name,
        email,
        password,
        clave: "123456",
      });

      if (res.data.success) {
        setMensaje("✅ Administrador creado. Redirigiendo...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al registrar: " + (error.response?.data?.message || "Intenta de nuevo"));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        boxSizing: "border-box",
        background: "linear-gradient(135deg, #f9a825, #ff7043, #ffcc80)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "380px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", fontWeight: "bold", color: "#333" }}>
          Registro Docente
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#ff6f00ff",
              color: "white",
              border: "none",
              padding: "0.7rem",
              borderRadius: "8px",
              fontSize: "1rem",
              width: "100%",
              marginTop: "1rem",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#fb8c00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff9800")}
          >
            Crear administrador
          </button>
        </form>
        <p style={{ marginTop: "1rem" }}> ¿Ya tenés una cuenta?{" "}
          <Link to="/login" style={{ textDecoration: "none", color: "#ff9800" }}>
              Login
          </Link>
        </p>
        {mensaje && <p style={{ marginTop: "1rem" }}>{mensaje}</p>}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.6rem",
  marginBottom: "1rem",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  boxSizing: "border-box",
};

export default RegisterAdminPage;