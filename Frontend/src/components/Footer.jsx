// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1c140d] text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">

          {/* ===== Brand ===== */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-extrabold tracking-tight">
              Monark<span className="text-primary">Foundation</span>
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed">
              Working for education, health, water, food security and women
              empowerment in rural Gujarat.
            </p>

            <div className="flex gap-4">
              <a className="p-2 rounded-full bg-white/10 hover:bg-primary">
                <FaFacebookF />
              </a>
              <a className="p-2 rounded-full bg-white/10 hover:bg-primary">
                <FaTwitter />
              </a>
              <a className="p-2 rounded-full bg-white/10 hover:bg-primary">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* ================= MOBILE HORIZONTAL WRAP ================= */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">

            {/* ===== Quick Links ===== */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link to="/work" className="hover:text-primary">Our Work</Link></li>
                <li><Link to="/stories" className="hover:text-primary">Impact Stories</Link></li>
                <li><Link to="/get-involved" className="hover:text-primary">Get Involved</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>

            {/* ===== Our Projects ===== */}
            <div>
              <h4 className="text-lg font-bold mb-6">Our Projects</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/projects/education" className="hover:text-primary">Education</Link></li>
                <li><Link to="/projects/water" className="hover:text-primary">Clean Water</Link></li>
                <li><Link to="/projects/healthcare" className="hover:text-primary">Healthcare</Link></li>
                <li><Link to="/projects/food" className="hover:text-primary">Food Security</Link></li>
                <li><Link to="/projects/women" className="hover:text-primary">Women Empowerment</Link></li>
              </ul>
            </div>
          </div>

          {/* ================= Newsletter ================= */}
          <div>
            <h4 className="text-lg font-bold mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for latest updates & impact stories
            </p>

            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="py-3 px-6 bg-primary hover:bg-primary-dark rounded-lg font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Monark Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
