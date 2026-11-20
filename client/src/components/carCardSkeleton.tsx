export function CarCardSkeleton() {
  return (
    <div className="card h-100 border-0 shadow-sm placeholder-glow" aria-hidden="true">
      <div className="placeholder w-100" style={{ height: "12rem", borderRadius: 0 }} />
      <div className="card-body">
        <p className="placeholder col-8 mb-2" style={{ height: "1rem" }} />
        <p className="placeholder col-5 mb-0" style={{ height: "0.9rem" }} />
      </div>
    </div>
  );
}