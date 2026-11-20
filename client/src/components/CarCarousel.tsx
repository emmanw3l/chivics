import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { CarImage } from "../types/car";
import { Lightbox } from "./Lightbox";

interface CarCarouselProps {
  images: CarImage[];
  alt: string;
  size?: "card" | "modal";
  enableLightbox?: boolean;
}

export function CarCarousel({ images, alt, size = "card", enableLightbox = false }: CarCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const height = size === "modal" ? "28rem" : "12rem";

  if (images.length === 0) {
    return (
      <div
        className="d-flex align-items-center justify-content-center bg-light text-muted small"
        style={{ height }}
      >
        No photos yet
      </div>
    );
  }

  return (
    <div className="position-relative">
      <div className="overflow-hidden" style={{ height }} ref={emblaRef}>
        <div className="d-flex h-100">
          {images.map((image) => (
            <div className="position-relative flex-shrink-0 w-100 h-100" key={image.id}>
              <img
                src={image.url}
                alt={alt}
                className="w-100 h-100"
                style={{ objectFit: "cover", cursor: enableLightbox ? "zoom-in" : undefined }}
                loading="lazy"
                onClick={
                  enableLightbox
                    ? (e) => {
                        e.stopPropagation();
                        setLightboxOpen(true);
                      }
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <motion.button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              emblaApi?.scrollPrev();
            }}
            className="btn btn-sm rounded-circle position-absolute top-50 start-0 translate-middle-y ms-2 d-flex align-items-center justify-content-center text-white"
            style={{
              width: 32,
              height: 32,
              backgroundColor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.35)", scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            ‹
          </motion.button>
          <motion.button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              emblaApi?.scrollNext();
            }}
            className="btn btn-sm rounded-circle position-absolute top-50 end-0 translate-middle-y me-2 d-flex align-items-center justify-content-center text-white"
            style={{
              width: 32,
              height: 32,
              backgroundColor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.35)", scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            ›
          </motion.button>

          <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-1">
            {images.map((image, i) => (
              <motion.span
                key={image.id}
                className="rounded-circle"
                style={{ width: 6, height: 6, backgroundColor: "#fff" }}
                animate={{ opacity: i === selectedIndex ? 1 : 0.5, scale: i === selectedIndex ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </>
      )}

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={images}
            initialIndex={selectedIndex}
            alt={alt}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}