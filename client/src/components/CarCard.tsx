import { motion } from "framer-motion";
import type { Car } from "../types/car";
import { formatPrice } from "../lib/format";
import { CarCarousel } from "./CarCarousel";

interface CarCardProps {
  car: Car;
  onSelect: (car: Car) => void;
}

export function CarCard({ car, onSelect }: CarCardProps) {
  return (
    <motion.div
      className="card h-100 border-0 shadow-sm"
      whileHover={{ y: -6, boxShadow: "0 12px 24px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <button
        type="button"
        onClick={() => onSelect(car)}
        className="btn p-0 border-0 text-start w-100"
      >
        <CarCarousel images={car.images} alt={`${car.year} ${car.make} ${car.model}`} size="card" />
        <div className="card-body">
          <h3 className="card-title h6 mb-1">
            {car.year} {car.make} {car.model}
          </h3>
          <p className="card-text text-muted mb-0">{formatPrice(car.price)}</p>
        </div>
      </button>
    </motion.div>
  );
}