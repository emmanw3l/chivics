import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { BUSINESS_ADDRESS, BUSINESS_LAT, BUSINESS_LNG, BUSINESS_MAPS_URL } from "../lib/constants";
import OpenStatusBadge from "./OpenStausBadge";

export function LocationSection() {
  const embedSrc = `https://www.google.com/maps?q=${BUSINESS_LAT},${BUSINESS_LNG}&z=16&output=embed`;

  return (
    <section className="container py-5">
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="display-6 fw-bold mb-2">Visit Us</h2>
        <p className="text-muted mb-0">Come see the cars in person — we're easy to find.</p>
      </motion.div>

      <motion.div
        className="rounded-4 overflow-hidden shadow-sm"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <iframe
          src={embedSrc}
          width="100%"
          height="360"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Chivics Connections Motors Company location"
        />

        <div className="p-4 d-flex flex-wrap align-items-center justify-content-between gap-3 bg-white">
          <div className="d-flex align-items-start gap-2">
            <FaLocationDot className="mt-1 text-muted flex-shrink-0" />
            <div>
              <div>{BUSINESS_ADDRESS}</div>
              <OpenStatusBadge />
            </div>
          </div>
          <a
            href={BUSINESS_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn text-white fw-medium"
            style={{ backgroundColor: "#1e4fd6" }}
          >
            Get Directions
          </a>
        </div>
      </motion.div>
    </section>
  );
}