// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowRight } from "react-icons/fa";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/leadership", label: "Leadership" },
  { to: "/event", label: "Events" },
  { to: "/register", label: "Register" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/monarkfoundation?igsh=a3p6aXc4cGd1cmdy",
    label: "Instagram",
    Icon: FaInstagram,
  },
  { href: "#", label: "Facebook", Icon: FaFacebookF },
  { href: "#", label: "Twitter", Icon: FaTwitter },
];

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-10 overflow-hidden">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[36rem] bg-orange-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* ===== Brand ===== */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold tracking-tight">
              Monark<span className="text-orange-500"> Foundation</span>
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Working for education, health, water, food security and women
              empowerment in rural Gujarat.
            </p>

            <div className="flex gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Monark Foundation on ${label}`}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white
                             transition-all duration-300 ease-out
                             hover:-translate-y-1 hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/40"
                >
                  <Icon className="text-sm transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* ================= LINKS ================= */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 h-0.5 w-8 bg-orange-500 rounded-full" />
            </h4>
            <ul className="space-y-3 text-gray-400">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-orange-500"
                  >
                    <FaArrowRight
                      className="text-[10px] text-orange-500 opacity-0 -translate-x-2 transition-all duration-300
                                 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                    <span className="relative">
                      {label}
                      <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= GOOGLE MAP ================= */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              Our Location
              <span className="absolute -bottom-2 left-0 h-0.5 w-8 bg-orange-500 rounded-full" />
            </h4>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Monark+Foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div
                className="rounded-xl overflow-hidden border border-white/10 shadow-lg
                           transition-all duration-300 group-hover:border-orange-500/60
                           group-hover:shadow-orange-500/20"
              >
                <iframe
                  title="Monark Foundation Location"
                  src="https://www.google.com/maps?q=Monark+Foundation&output=embed"
                  className="w-full h-40 sm:h-44 md:h-48 lg:h-44 pointer-events-none grayscale-[30%] transition-all duration-300 group-hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <span
                className="mt-3 inline-flex items-center gap-2 text-orange-500 font-semibold
                           transition-all duration-300 group-hover:gap-3"
              >
                View on Google Maps
                <FaArrowRight className="text-xs" />
              </span>
            </a>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Monark Foundation. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="relative transition-colors duration-300 hover:text-orange-500 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="relative transition-colors duration-300 hover:text-orange-500 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;