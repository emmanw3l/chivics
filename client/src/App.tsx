import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAdmin } from "./components/RequireAdmin";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { CarForm } from "./pages/admin/CarForm";
import { AdminLogin } from "./pages/admin/Login";
import { Home } from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/cars/new"
        element={
          <RequireAdmin>
            <CarForm />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/cars/:id"
        element={
          <RequireAdmin>
            <CarForm />
          </RequireAdmin>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
