import { signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { auth } from "../../lib/firebase";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2a6b 0%, #1e4fd6 55%, #2f6bff 100%)",
      }}
    >
      <motion.div
        className="w-100 mx-3 p-4 p-sm-5 rounded-4"
        style={{
          maxWidth: 400,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center mb-4">
          <img src={logo} alt="Chivics Connections Motors Company" height={44} className="mb-3" />
          <h1 className="h6 text-white mb-0">Admin login</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white-50 small" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control bg-white bg-opacity-10 border-white border-opacity-25 text-white"
              style={{ colorScheme: "dark" }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-white-50 small" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control bg-white bg-opacity-10 border-white border-opacity-25 text-white"
              style={{ colorScheme: "dark" }}
            />
          </div>

          {error && <p className="text-warning small">{error}</p>}

          <motion.button
            type="submit"
            disabled={submitting}
            className="btn w-100 text-white fw-medium"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.18)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.35)",
            }}
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}