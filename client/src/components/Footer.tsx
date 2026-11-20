import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaEnvelope, FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import { EMAIL, FACEBOOK_URL, INSTAGRAM_URL, PHONE_DISPLAY, WHATSAPP_NUMBER } from "../lib/constants";

interface IconBadgeProps {
  icon: IconType;
  href: string;
  label: string;
}

function IconBadge({ icon: Icon, href, label }: IconBadgeProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="d-flex align-items-center justify-content-center rounded-circle text-white"
      style={{
        width: 44,
        height: 44,
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
      }}
      whileHover={{
        scale: 1.1,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Icon size={18} />
    </motion.a>
  );
}

export function Footer() {
  return (
    <footer
      className="pt-5 pb-4 text-white position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f2a6b 0%, #1e4fd6 55%, #00091d 100%)",
      }}
    >
      {/* Soft glow shapes behind the frosted panels for extra depth */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: 320,
          height: 320,
          top: -120,
          right: -80,
          background: "rgba(255,255,255,0.08)",
          filter: "blur(60px)",
        }}
      />

      <div className="container position-relative">
        <div className="row gy-4 align-items-start">
          <div className="col-md-4">
            <div
              className="d-inline-flex align-items-center p-2 rounded-3 mb-3"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <img src={logo} alt="Chivics Connections Motors Company" height={36} />
            </div>
            <p className="text-white-50 small mb-0">
              Quality used cars, hand-picked and ready to drive.
            </p>
          </div>

          <div className="col-6 col-md-4">
            <h6 className="small text-uppercase text-white-50 mb-3">Get in touch</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-white d-inline-flex align-items-center gap-2"
                >
                  <FaWhatsapp size={16} /> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-decoration-none text-white d-inline-flex align-items-center gap-2"
                >
                  <FaEnvelope size={14} /> {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-4">
            <h6 className="small text-uppercase text-white-50 mb-3">Follow us</h6>
            <div className="d-flex gap-3">
              <IconBadge icon={FaInstagram} href={INSTAGRAM_URL} label="Instagram" />
              <IconBadge icon={FaFacebookF} href={FACEBOOK_URL} label="Facebook" />
            </div>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <p className="text-white-50 small mb-0 text-center">
          &copy; {new Date().getFullYear()} Chivics Connections Motors Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}