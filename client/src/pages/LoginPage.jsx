import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      if (res.data.success) {
        const role = res.data.user.role;
        localStorage.setItem("userId", res.data.user.id);
        setMensaje("✅ Login exitoso");

        setTimeout(() => {
          if (role === "admin") navigate("/admin");
          else if (role === "empleado") navigate("/employee");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Email o contraseña incorrectos");
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ca3810ff")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#e67022ff")}
          >
            Ingresar
          </button>
        </form>
        <p/>
        <Link to="/" style={{ textDecoration: "none", color: "#ff9800" }}>
              Volver
          </Link>
        {mensaje && (
          <p
            style={{
              ...styles.message,
              color: mensaje.includes("✅") ? "#27ae60" : "#c0392b",
            }}
          >
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  background: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #f59352ff 0%, #ec2482ff 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2.5rem 2rem",
    borderRadius: "16px",
    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "1.9rem",
    marginBottom: "1.5rem",
    fontWeight: "600",
    color: "#2c3e50",
  },
  input: {
    width: "100%",
    padding: "0.85rem",
    margin: "0.65rem 0",
    fontSize: "1.05rem",
    borderRadius: "10px",
    border: "1px solid #ced4da",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease-in-out",
  },
  button: {
    width: "100%",
    padding: "0.85rem",
    fontSize: "1.05rem",
    backgroundColor: "#e67e22", 
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "background-color 0.3s ease",
  },
  message: {
    marginTop: "1rem",
    fontSize: "0.95rem",
    fontWeight: "500",
  },
};

export default LoginPage;