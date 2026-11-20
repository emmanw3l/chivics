import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { CarImage } from "../types/car";

interface LightboxProps {
  images: CarImage[];
  initialIndex: number;
  alt: string;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, alt, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex);

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  return (
    <motion.div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.9)", zIndex: 2000 }}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="btn-close btn-close-white position-absolute"
        style={{ top: 20, right: 20 }}
      />

      <AnimatePresence mode="wait">
        <motion.img
          key={images[index].id}
          src={images[index].url}
          alt={alt}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          style={{ maxWidth: "92vw", maxHeight: "88vh", objectFit: "contain" }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="btn btn-link text-white position-absolute top-50 start-0 translate-middle-y fs-1 text-decoration-none"
            style={{ marginLeft: 8 }}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="btn btn-link text-white position-absolute top-50 end-0 translate-middle-y fs-1 text-decoration-none"
            style={{ marginRight: 8 }}
          >
            ›
          </button>

          <div
            className="position-absolute text-white-50 small"
            style={{ bottom: 20, left: "50%", transform: "translateX(-50%)" }}
          >
            {index + 1} / {images.length}
          </div>
        </>
      )}
    </motion.div>
  );
}