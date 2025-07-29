import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterAdminPage from "./pages/RegisterAdminPage";
import AdminPage from "./pages/AdminPage";
import EmployeePage from "./pages/EmployeePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register-admin" element={<RegisterAdminPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/employee" element={<EmployeePage />} />
    </Routes>
  );
}

export default App;
