import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeePage() {
  const [mensaje, setMensaje] = useState("");
  const [userId, setUserId] = useState(null);
  const [entryMarked, setEntryMarked] = useState(false);
  const [exitMarked, setExitMarked] = useState(false);
  const [horaActual, setHoraActual] = useState("");
  const [nombreEmpleado, setNombreEmpleado] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) {
      setMensaje("❌ No se encontró el ID del usuario");
      return navigate("/");
    }
    setUserId(id);
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3000/api/attendance/status/${userId}`)
        .then((res) => {
          setEntryMarked(res.data.entryMarked);
          setExitMarked(res.data.exitMarked);
        })
        .catch((err) => {
          console.error(err);
          setMensaje("❌ No se pudo obtener el estado de asistencia");
        });
    }
  }, [userId]);

  useEffect(() => {
  if (userId) {
    axios.get(`http://localhost:3000/api/users/${userId}`)
      .then((res) => {
        setNombreEmpleado(res.data.name);
      })
      .catch((err) => {
        console.error(err);
        setMensaje("❌ No se pudo obtener el nombre del usuario");
      });
  }
}, [userId]);


  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const hh = pad(now.getHours());
      const mm = pad(now.getMinutes());
      const ss = pad(now.getSeconds());
      setHoraActual(`${hh}:${mm}:${ss}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const marcarEntrada = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/attendance/mark-entry", { userId });
      if (res.data.success) {
        setMensaje("✅ Entrada registrada");
        setEntryMarked(true);
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ No se pudo marcar la entrada");
    }
  };

  const marcarSalida = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/attendance/mark-exit", { userId });
      if (res.data.success) {
        setMensaje("✅ Salida registrada");
        setExitMarked(true);
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ No se pudo marcar la salida");
    }
  };

  const horaEsMayorOIgual = (horaLimite) => {
    return horaActual.slice(0, 5) >= horaLimite;
  };

  const cerrarSesion = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(to right, #f88800ff, #d57d86ff)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <button
        onClick={cerrarSesion}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          backgroundColor: "#ff6b00",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"
        }}
      >
        Cerrar sesión
      </button>

      <div style={{
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "20px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        width: "90%",
        maxWidth: "500px",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#333", marginBottom: "1rem" }}>👋 Hola, {nombreEmpleado}</h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>🕒 Hora actual: {horaActual}</p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "1rem" }}>
          <button
            onClick={marcarEntrada}
            disabled={entryMarked || !horaEsMayorOIgual("07:30")}
            style={{
              backgroundColor: "#ff8c00",
              color: "#fff",
              padding: "0.6rem 1.2rem",
              border: "none",
              borderRadius: "8px",
              cursor: entryMarked || !horaEsMayorOIgual("07:30") ? "not-allowed" : "pointer",
              opacity: entryMarked || !horaEsMayorOIgual("07:30") ? 0.6 : 1,
              transition: "background-color 0.3s"
            }}
          >
            Marcar Entrada
          </button>

          <button
            onClick={marcarSalida}
            disabled={!entryMarked || exitMarked || !horaEsMayorOIgual("19:00")}
            style={{
              backgroundColor: "#ff8c00",
              color: "#fff",
              padding: "0.6rem 1.2rem",
              border: "none",
              borderRadius: "8px",
              cursor: (!entryMarked || exitMarked || !horaEsMayorOIgual("19:00")) ? "not-allowed" : "pointer",
              opacity: (!entryMarked || exitMarked || !horaEsMayorOIgual("19:00")) ? 0.6 : 1,
              transition: "background-color 0.3s"
            }}
          >
            Marcar Salida
          </button>
        </div>

        {mensaje && <p style={{ color: "#444", fontWeight: "bold" }}>{mensaje}</p>}

        <div style={{ marginTop: "1.5rem", fontSize: "1rem", color: "#555" }}>
          <p>✅ Entrada marcada: {entryMarked ? "Sí" : "No"}</p>
          <p>✅ Salida marcada: {exitMarked ? "Sí" : "No"}</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeePage