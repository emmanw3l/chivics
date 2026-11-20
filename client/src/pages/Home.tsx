import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CarCard } from "../components/CarCard";
import { CarCardSkeleton } from "../components/carCardSkeleton";
import { CarModal } from "../components/CarModal";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { api } from "../lib/api";
import type { Car } from "../types/car";
import { LocationSection } from "../components/locationSection";

export function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    api
      .get<Car[]>("/cars")
      .then((res) => setCars(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Navbar />

      <Hero />

      <section
        id="cars"
        className="container py-5"
        style={{ scrollMarginTop: "76px" }}
      >
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="display-6 fw-bold mb-2">Available Cars</h2>
          <p className="text-muted mb-0">
            Every listing below is hand-inspected and ready to go.
          </p>
        </motion.div>

        {loading ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="col" key={i}>
                <CarCardSkeleton />
              </div>
            ))}
          </div>
        ) : cars.length === 0 ? (
          <p className="text-muted text-center">No cars listed yet.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {cars.map((car, i) => (
              <motion.div
                className="col"
                key={car.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: (i % 3) * 0.1,
                }}
              >
                <CarCard car={car} onSelect={setSelectedCar} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      <LocationSection />

      <Footer />
    </div>
  );
}
