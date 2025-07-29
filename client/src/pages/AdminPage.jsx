import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  const fetchUsuarios = async () => {
    const res = await axios.get("http://localhost:3000/api/users");
    setUsuarios(res.data);
  };

  const fetchAsistencias = async () => {
    const res = await axios.get("http://localhost:3000/api/attendances");
    setAsistencias(res.data);
  };

  useEffect(() => {
    fetchUsuarios();
    fetchAsistencias();

    const id = localStorage.getItem("userId");
    if (!id) {
      setMensaje("❌ No se encontró el ID del administrador");
      navigate("/");
    }
    if (id) {
      axios.get(`http://localhost:3000/api/users/${id}`)
        .then((res) => {
          setAdminName(res.data.name);
        })
        .catch((err) => {
          console.error("No se pudo obtener el nombre del administrador", err);
        });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await axios.post("http://localhost:3000/api/register-employee", {
        name,
        email,
        password,
      });
      if (res.data.success) {
        setMensaje("✅ Empleado registrado correctamente");
        setName("");
        setEmail("");
        setPassword("");
        fetchUsuarios();
      }
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al registrar empleado");
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que querés borrar este empleado?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3000/api/employees/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al borrar empleado:", error.response?.data || error.message);
  alert("❌ No se pudo borrar el empleado");
      // console.error("Error al borrar empleado:", error);
      // alert("❌ No se pudo borrar el empleado");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <button
          onClick={cerrarSesion}
          style={styles.logoutButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#ca5c10")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#e65d22ff")}
        >
          Cerrar sesión
        </button>
      </div>

      <h2 style={styles.title}>Hola Profe {adminName}</h2>

      <div style={styles.content}>
        <div style={styles.mainContainer}>
          <div style={styles.leftColumn}>
            <div style={{ ...styles.card, height: 'fit-content' }}>
              <h3 style={styles.cardTitle}>Registrar nuevo estudiante</h3>
              <form onSubmit={handleSubmit} style={styles.form}>
                <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
                <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
                <button type="submit" style={styles.primaryButton}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#ca5c10")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#e65d22ff")}
                >
                  Registrar
                </button>
              </form>
              {mensaje && <p style={{ marginTop: "0.5rem", fontWeight: "500", fontSize: "0.9rem" }}>{mensaje}</p>}
            </div>

            <div style={{ ...styles.card, ...styles.scrollBox }}>
              <h3 style={styles.cardTitle}>Lista de alumnos</h3>
              <ul style={{ paddingLeft: "1rem", marginTop: "0.5rem", fontSize: "0.9rem" }}>
                {usuarios
                  .filter((u) => u.role === "empleado")
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((u) => (
                    <li key={u._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                      <span>{u.name} ({u.email})</span>
                      <button
                        onClick={() => handleDelete(u._id)}
                        style={{
                          backgroundColor: "#e74c3c",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          padding: "0.2rem 0.5rem",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
                      >
                        Borrar
                      </button>
                    </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={styles.rightColumn}>
            <div style={{ ...styles.card, borderRadius: "12px", padding: "1rem", background: "#ffffffdd" }}>
              <h3 style={styles.cardTitle}>Planilla de asistencias</h3>
              <div style={{ maxHeight: "250px", overflowY: "auto", borderRadius: "8px", paddingRight: "5px", background: "#fff" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                  <thead>
                    <tr>
                      <th style={thStyle}>Fecha</th>
                      <th style={thStyle}>Empleado</th>
                      <th style={thStyle}>Entrada</th>
                      <th style={thStyle}>Salida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asistencias.map((a) => (
                      <tr key={a._id}>
                        <td style={tdStyle}>{a.date}</td>
                        <td style={tdStyle}>{a.user?.name}</td>
                        <td style={tdStyle}>{a.entryTime || "-"}</td>
                        <td style={tdStyle}>{a.exitTime || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(135deg, #65eaf6ff, #e44ae4ff)",
  },
  topBar: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem 2rem 0 2rem",
  },
  title: {
    fontSize: "1.8rem",
    color: "#2c3e50",
    textAlign: "center",
    marginTop: "0.5rem",
  },
  cardTitle: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
    color: "#333",
  },
  content: {
    flex: 1,
    padding: "1rem 2rem",
    overflow: "hidden",
  },
  mainContainer: {
    display: "flex",
    height: "100%",
    gap: "1.2rem",
  },
  leftColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    minWidth: "260px",
  },
  rightColumn: {
    flex: 2,
    minWidth: "400px",
    overflow: "auto",
  },
  card: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
  },
  scrollBox: {
    overflowY: "auto",
    maxHeight: "200px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
  },
  primaryButton: {
    padding: "0.6rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#e67e22",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  logoutButton: {
    padding: "0.6rem 1.3rem",
    fontSize: "1.05rem",
    backgroundColor: "#e67e22",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

const thStyle = {
  borderBottom: "2px solid #ccc",
  textAlign: "left",
  padding: "0.4rem",
  backgroundColor: "#f8f8f8",
  color: "#333",
  fontSize: "0.9rem",
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "0.4rem",
  fontSize: "0.9rem",
};

export default AdminPage;