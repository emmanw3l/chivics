import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import type { Car } from "../types/car";
import { formatPrice } from "../lib/format";
import { WHATSAPP_NUMBER } from "../lib/constants";
import { CarCarousel } from "./CarCarousel";

interface CarModalProps {
  car: Car | null;
  onClose: () => void;
}

export function CarModal({ car, onClose }: CarModalProps) {
  // Close on Escape so keyboard users aren't trapped in the overlay.
  useEffect(() => {
    if (!car) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [car, onClose]);

  return (
    <AnimatePresence>
      {car && (
        <motion.div
          className="modal d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="modal-content">
              <CarCarousel
                images={car.images}
                alt={`${car.year} ${car.make} ${car.model}`}
                size="modal"
                enableLightbox
              />

              <div className="modal-body">
                <div className="d-flex align-items-start justify-content-between gap-3">
                  <div>
                    <h2 className="h4 mb-1">
                      {car.year} {car.make} {car.model}
                    </h2>
                    <p className="text-muted fs-5 mb-0">{formatPrice(car.price)}</p>
                  </div>
                  <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
                </div>

                <dl className="row row-cols-2 gy-2 mt-3 small text-muted">
                  {car.mileage != null && (
                    <div className="col">
                      <dt className="text-secondary fw-normal">Mileage</dt>
                      <dd className="mb-0 text-dark">{car.mileage.toLocaleString()} mi</dd>
                    </div>
                  )}
                  {car.transmission && (
                    <div className="col">
                      <dt className="text-secondary fw-normal">Transmission</dt>
                      <dd className="mb-0 text-dark">{car.transmission}</dd>
                    </div>
                  )}
                  {car.fuelType && (
                    <div className="col">
                      <dt className="text-secondary fw-normal">Fuel type</dt>
                      <dd className="mb-0 text-dark">{car.fuelType}</dd>
                    </div>
                  )}
                </dl>

                <p className="mt-3" style={{ whiteSpace: "pre-line" }}>
                  {car.description}
                </p>

                <motion.a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hi, I'm interested in the ${car.year} ${car.make} ${car.model} (${formatPrice(car.price)}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-100 mt-2 text-white fw-medium d-flex align-items-center justify-content-center gap-2"
                  style={{ backgroundColor: "#25D366" }}
                  whileHover={{ backgroundColor: "#1ebe57" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaWhatsapp size={18} /> Enquire on WhatsApp
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}