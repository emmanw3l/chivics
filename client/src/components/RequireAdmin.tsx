import { onAuthStateChanged } from "firebase/auth";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../lib/firebase";

export function RequireAdmin({ children }: { children: ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // Firebase restores the session asynchronously on load, so we wait for
    // the first auth-state callback before deciding whether to redirect.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthed(Boolean(user));
      setChecking(false);
    });
    return unsubscribe;
  }, []);

  if (checking) return null;
  if (!isAuthed) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}