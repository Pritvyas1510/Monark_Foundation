// components/ExecutiveLeadership.jsx
import React from 'react';
import { executiveLeaders } from '../lib/leadershipData';

const ExecutiveCard = ({ name, title, quote, imgSrc }) => {
  return (
    <div
      className="
        leader-card bg-white rounded-[8px] overflow-hidden 
        shadow-lg border border-gray-100 
        transition-transform duration-300 hover:-translate-y-2
      "
    >
      <img
        src={imgSrc}
        alt={name}
        className="w-full h-60 md:h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-[#ee8c2b] font-semibold text-sm mb-3">{title}</p>
        <p className="text-gray-600 text-sm italic leading-relaxed">"{quote}"</p>
      </div>
    </div>
  );
};

const ExecutiveLeadership = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50" id="executive-leadership">
      <div className="container mx-auto px-5 md:px-6 text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Executive Leadership</h2>
        <div className="h-1 w-16 bg-[#ee8c2b] mx-auto mt-3"></div>
      </div>

      <div className="container mx-auto px-5 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {executiveLeaders.map((leader, index) => (
            <ExecutiveCard
              key={index}
              name={leader.name}
              title={leader.title}
              quote={leader.quote}
              imgSrc={leader.imgSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveLeadership;