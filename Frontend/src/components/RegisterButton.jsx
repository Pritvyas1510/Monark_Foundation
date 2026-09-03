import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, ArrowRight } from "lucide-react";
import "./RegisterButton.css";

const RegisterButton = () => {
  const [visible, setVisible] = useState(false);

  /* SHOW AFTER SCROLL — same adaptive threshold as EventNotifyed,
     kept independent so this button doesn't depend on the
     notification card's mount/unmount state */
  useEffect(() => {
    const getThreshold = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return 0;
      return Math.min(810, scrollable * 0.2);
    };

    const handleScroll = () => setVisible(window.scrollY >= getThreshold());

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="register-btn-wrapper fixed z-40">
      <Link
        to="/register"
        className="register-btn group relative flex items-center gap-2.5 pl-3.5 pr-5 py-3.5 rounded-full text-white font-bold text-sm shadow-2xl overflow-hidden"
      >
        {/* pulsing glow ring */}
        <span className="register-btn-ping absolute inset-0 rounded-full bg-orange-400" />

        {/* animated gradient background (separate layer so shine can sit above it) */}
        <span className="register-btn-bg absolute inset-0 rounded-full" />

        {/* diagonal shine sweep on hover */}
        <span className="register-btn-shine absolute inset-0 rounded-full overflow-hidden">
          <span className="register-btn-shine-bar" />
        </span>

        
        <span className="relative whitespace-nowrap text-xl font-bold font-serif">Register Now</span>
        <ArrowRight
          size={24}
          className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
        />
      </Link>
    </div>
  );
};

export default RegisterButton;