// components/ExecutiveLeadership.jsx
//
// Uses Inter for everything (clean corporate sans). Add to your <head> if not
// already loaded site-wide:
//   <link rel="preconnect" href="https://fonts.googleapis.com">
//   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
//
// leadershipData.js entries can optionally include `linkedin` and `email` —
// both are safely omitted from the card if not provided.

// npm install react-icons  (if not already in your project)
import React from 'react';
import { FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { executiveLeaders } from '../lib/leadershipData';

const ExecutiveCard = ({ name, title, quote, imgSrc, linkedin, email }) => {
  return (
    <article
      className="
        group bg-white rounded-xl overflow-hidden
        border border-gray-200
        transition-all duration-300 ease-out
        hover:border-[#ee8c2b] hover:shadow-[0_12px_32px_-12px_rgba(17,24,39,0.18)]
        hover:-translate-y-1
      "
    >
      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={imgSrc}
          alt={name}
          className="
            w-full h-full object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-[1.03]
          "
        />
      </div>

      {/* Body */}
      <div className="px-6 pt-5 pb-6">
        <h3 className="text-lg font-bold text-gray-900 leading-snug">
          {name}
        </h3>
        <p className="mt-1 text-[13px] font-semibold uppercase tracking-wide text-[#ee8c2b]">
          {title}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed italic">
            "{quote}"
          </p>
        </div>

        {(linkedin || email) && (
          <div className="mt-4 flex items-center gap-3">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on LinkedIn`}
                className="
                  inline-flex items-center justify-center w-8 h-8 rounded-full
                  bg-gray-50 text-gray-500 border border-gray-200
                  transition-colors duration-200
                  hover:bg-[#ee8c2b]/10 hover:text-[#ee8c2b] hover:border-[#ee8c2b]/30
                "
              >
                <FaLinkedinIn size={14} />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                aria-label={`Email ${name}`}
                className="
                  inline-flex items-center justify-center w-8 h-8 rounded-full
                  bg-gray-50 text-gray-500 border border-gray-200
                  transition-colors duration-200
                  hover:bg-[#ee8c2b]/10 hover:text-[#ee8c2b] hover:border-[#ee8c2b]/30
                "
              >
                <FaEnvelope size={14} />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

const ExecutiveLeadership = () => {
  return (
    <section className="py-16 md:py-20 bg-white" id="executive-leadership">
      <div className="container mx-auto px-5 md:px-6 text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#ee8c2b] mb-2">
          Leadership
        </p>
        <h2 className="text-3xl md:text-[34px] font-bold text-gray-900">
          Executive Leadership
        </h2>
        <div className="h-1 w-14 bg-[#ee8c2b] mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="container mx-auto px-5 md:px-6">
        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {executiveLeaders.map((leader, index) => (
            <ExecutiveCard
              key={index}
              name={leader.name}
              title={leader.title}
              quote={leader.quote}
              imgSrc={leader.imgSrc}
              linkedin={leader.linkedin}
              email={leader.email}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveLeadership;