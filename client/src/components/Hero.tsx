import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";


import slide1 from "../assets/hero/slide-1.jpg";
import slide2 from "../assets/hero/slide-2.jpg";
import slide3 from "../assets/hero/slide-3.jpg";

const SLIDES = [slide1, slide2, slide3];
const INTERVAL_MS = 4500;
const FADE_DURATION = 1.8;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="position-relative d-flex align-items-center text-center text-white"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <AnimatePresence>
        <motion.div
          key={SLIDES[activeIndex]}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${SLIDES[activeIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: FADE_DURATION, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: (INTERVAL_MS + FADE_DURATION * 1000) / 1000, ease: "linear" },
          }}
        />
      </AnimatePresence>

      {/* Darken the photos so the text stays readable regardless of image */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      />

      <motion.div
        className="container position-relative py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="display-4 fw-bold mb-3">Find Your Next Ride</h1>
        <p className="lead mb-4">
          Quality used cars, hand-picked and ready to drive — browse the current lineup below.
        </p>
        <motion.a
          href="#cars"
          className="btn btn-lg px-4 text-white d-inline-block"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          }}
          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)", scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          View Cars
        </motion.a>
      </motion.div>
    </section>
  );
}