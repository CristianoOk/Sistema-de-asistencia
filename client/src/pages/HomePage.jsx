import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [showClave, setShowClave] = useState(false);
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  const CLAVE_CORRECTA = "123456";

  const handleVerificarClave = () => {
    if (clave === CLAVE_CORRECTA) {
      navigate("/register-admin");
    } else {
      setError("❌ Clave incorrecta");
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #ff9966, #ff5e62)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        color: "#fff",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Bienvenido al sistema de asistencia</h1>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={() => navigate("/login")}>Ingresar</button>
        <button onClick={() => setShowClave(true)}>Registrarse</button>
      </div>

      {showClave && (
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <input
            type="password"
            placeholder="Clave de autorización"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            style={{
    width: "100%",
    padding: "0.85rem",
    margin: "0.65rem 0",
    fontSize: "1.05rem",
    borderRadius: "10px",
    border: "1px solid #ced4da",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease-in-out",
  }}
          />
          <button onClick={handleVerificarClave}>Verificar</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
}

export default HomePage;