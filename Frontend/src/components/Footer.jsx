// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* ===== Brand ===== */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold tracking-tight">
              Monark<span className="text-orange-500">Foundation</span>
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed">
              Working for education, health, water, food security and women
              empowerment in rural Gujarat.
            </p>

            <div className="flex gap-4">
              <a className="p-2 rounded-full bg-white/10 hover:bg-orange-500 transition">
                <FaFacebookF />
              </a>
              <a className="p-2 rounded-full bg-white/10 hover:bg-orange-500 transition">
                <FaTwitter />
              </a>
              <a className="p-2 rounded-full bg-white/10 hover:bg-orange-500 transition">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* ================= LINKS ================= */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link to="/about" className="hover:text-orange-500">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/work" className="hover:text-orange-500">
                    Our Work
                  </Link>
                </li>
                <li>
                  <Link to="/stories" className="hover:text-orange-500">
                    Impact Stories
                  </Link>
                </li>
                <li>
                  <Link to="/get-involved" className="hover:text-orange-500">
                    Get Involved
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-orange-500">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Our Projects</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link
                    to="/projects/education"
                    className="hover:text-orange-500"
                  >
                    Education
                  </Link>
                </li>
                <li>
                  <Link to="/projects/water" className="hover:text-orange-500">
                    Clean Water
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects/healthcare"
                    className="hover:text-orange-500"
                  >
                    Healthcare
                  </Link>
                </li>
                <li>
                  <Link to="/projects/food" className="hover:text-orange-500">
                    Food Security
                  </Link>
                </li>
                <li>
                  <Link to="/projects/women" className="hover:text-orange-500">
                    Women Empowerment
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ================= GOOGLE MAP ================= */}
          <div>
            <h4 className="text-lg font-bold mb-4">Our Location</h4>

            <a
              href="https://www.google.com/maps/place/Monark+University"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-orange-500 font-semibold hover:underline"
            >
              <div className="rounded-xl overflow-hidden border border-white/20 shadow-lg">
                <iframe
                  title="Monark University Location"
                  src="https://www.google.com/maps?q=Monark+University&output=embed"
                  className="w-full h-40 sm:h-44 md:h-48 lg:h-44"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </a>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Monark Foundation. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-orange-500">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-orange-500">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
