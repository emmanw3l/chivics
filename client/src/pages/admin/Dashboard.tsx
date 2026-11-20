import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "./adminHeader";
import { api } from "../../lib/api";
import { formatPrice } from "../../lib/format";
import { auth } from "../../lib/firebase";
import type { Car } from "../../types/car";

export function AdminDashboard() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function loadCars() {
    setLoading(true);
    api
      .get<Car[]>("/cars")
      .then((res) => setCars(res.data))
      .finally(() => setLoading(false));
  }

  useEffect(loadCars, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this car listing?")) return;
    await api.delete(`/admin/cars/${id}`);
    loadCars();
  }

  async function handleLogout() {
    await signOut(auth);
    navigate("/admin/login");
  }

  return (
    <div>
      <AdminHeader
        title="Manage cars"
        actions={
          <>
            <Link
              to="/admin/cars/new"
              className="btn btn-sm text-white fw-medium"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.18)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
              }}
            >
              + Add car
            </Link>
            <button onClick={handleLogout} className="btn btn-sm btn-link text-white-50">
              Log out
            </button>
          </>
        }
      />

      <div className="container pb-5">
        {loading ? (
          <p className="text-muted">Loading…</p>
        ) : cars.length === 0 ? (
          <p className="text-muted">No cars yet — add your first one.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {cars.map((car, i) => (
              <motion.div
                className="col"
                key={car.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <div className="card h-100 border-0 shadow-sm">
                  <div
                    className="w-100"
                    style={{
                      height: 160,
                      backgroundImage: car.images[0] ? `url(${car.images[0].url})` : undefined,
                      backgroundColor: car.images[0] ? undefined : "#f1f3f5",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="card-body">
                    <h3 className="card-title h6 mb-1">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <p className="card-text text-muted mb-1">{formatPrice(car.price)}</p>
                    <p className="card-text text-muted small mb-3">
                      {car.images.length} photo{car.images.length === 1 ? "" : "s"}
                    </p>
                    <div className="d-flex gap-3">
                      <Link to={`/admin/cars/${car.id}`} className="btn btn-outline-secondary btn-sm flex-grow-1">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="btn btn-outline-danger btn-sm flex-grow-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}