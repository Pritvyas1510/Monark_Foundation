// JoinUs.jsx
import React from "react";
import { FaHandsHelping, FaUsers, FaCheckCircle } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import {Link} from "react-router-dom"

const JoinUs = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden text-black">

      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/40 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-200/40 rounded-full blur-[120px] -z-10"></div>

      <section className="max-w-6xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">

          {/* LEFT SIDE IMAGE */}
          <div className="lg:w-1/2 relative group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1000&q=80"
              alt="Volunteers helping children"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            {/* Glass Info Card */}
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <FaHandsHelping className="text-2xl text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">
                    Impacting Lives Daily
                  </p>
                  <p className="text-white/70 text-sm">
                    Join a community dedicated to meaningful change.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE CTA */}
          <div className="lg:w-1/2 bg-slate-900 flex flex-col justify-center p-8 md:p-16 relative">

            <div className="relative z-10">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-orange-500/20">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                Membership Open
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Join Our <span className="text-orange-400">Mission</span>
              </h2>

              {/* Description */}
              <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-md">
                Be part of something bigger. Help us provide education,
                healthcare, and hope to communities who need it most.
              </p>

              {/* CTA Button */}
              <Link to="/register">
              <button className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-orange-900/40 active:scale-[0.98] group">
                <span className="text-lg">Register Now</span>
                <HiArrowRight className="text-2xl group-hover:translate-x-1 transition-transform" />
              </button></Link>

              {/* Features */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-8 border-t border-slate-700/50">

                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <FaCheckCircle className="text-orange-400" />
                  <span>Verified Impact</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <FaUsers className="text-orange-400" />
                  <span>Strong Community</span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <FaHandsHelping className="text-orange-400" />
                  <span>Trusted Support</span>
                </div>
              </div>

              {/* Member Count */}
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Member"
                    className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Member"
                    className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/women/68.jpg"
                    alt="Member"
                    className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover"
                  />
                  <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold">
                    +5k
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  Join 5,000+ active members
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinUs;
