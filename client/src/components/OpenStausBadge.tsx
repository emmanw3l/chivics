import { useEffect, useState } from "react";
import { getTodayLabel, isOpenNow } from "../lib/hours";

export default function OpenStatusBadge() {
  const [open, setOpen] = useState(isOpenNow());

  useEffect(() => {
    // Re-check every minute so a page left open overnight doesn't show a
    // stale status.
    const timer = setInterval(() => setOpen(isOpenNow()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="d-flex align-items-center gap-2">
      <span
        className="rounded-circle"
        style={{
          width: 8,
          height: 8,
          backgroundColor: open ? "#22c55e" : "#adb5bd",
          flexShrink: 0,
        }}
      />
      <span className={`small fw-medium ${open ? "text-success" : "text-muted"}`}>
        {open ? "Open now" : "Closed now"}
      </span>
      <span className="small text-muted">· {getTodayLabel()}</span>
    </div>
  );
}