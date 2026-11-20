import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";

interface AdminHeaderProps {
  title: string;
  actions?: ReactNode;
}

export default function AdminHeader({ title, actions }: AdminHeaderProps) {
  return (
    <header
      className="mb-4"
      style={{
        background: "linear-gradient(135deg, #0f2a6b 0%, #1e4fd6 55%, #2f6bff 100%)",
      }}
    >
      <div className="container py-3 d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div className="d-flex align-items-center gap-3">
          <Link to="/admin">
            <img src={logo} alt="Chivics Connections Motors Company" height={32} />
          </Link>
          <span className="text-white-50">/</span>
          <span className="text-white fw-medium">{title}</span>
        </div>
        {actions && <div className="d-flex align-items-center gap-3">{actions}</div>}
      </div>
    </header>
  );
}