import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";

const SCROLL_THRESHOLD = 60;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="navbar position-fixed top-0 start-0 w-100"
      style={{
        zIndex: 1030,
        borderBottom: "1px solid transparent",
        WebkitBackdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
      }}
      animate={{
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.65)" : "rgba(255, 255, 255, 0)",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        borderBottomColor: isScrolled ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="/">
          <motion.img
            src={logo}
            alt="Chivics Connections Motors Company"
            height={40}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        </a>
      </div>
    </motion.nav>
  );
}