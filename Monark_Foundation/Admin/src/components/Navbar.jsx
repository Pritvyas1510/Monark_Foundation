import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/slice/Login.slice.js";
import { HiMenu, HiX } from "react-icons/hi";


const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ get auth info
  const { token, role } = useSelector((state) => state.auth);

  if (!token) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  // 🔐 role based links
  const navLinks = [
    { to: "/home", label: "All Users", roles: ["admin", "sub_admin"] },

    { to: "/eventhome", label: "Events", roles: ["admin"] },
    { to: "/impactstory", label: "Impact Story", roles: ["admin"] },
    { to: "/story", label: "Testimonial", roles: ["admin"] },
  ];

  const linkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-md font-medium transition-colors ${
      isActive
        ? "bg-orange-500 text-white"
        : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
    }`;

  // filter based on role
  const visibleLinks = navLinks.filter((l) => l.roles.includes(role));

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/home">
            <h1 className="text-xl font-bold">
              <span className="text-orange-500">Monark</span> Foundation{" "}
              <span className="text-gray-400">Admin</span>
            </h1>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {visibleLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 text-white px-5 py-2.5 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-2 py-3 space-y-1">
          {visibleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md mt-3"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
