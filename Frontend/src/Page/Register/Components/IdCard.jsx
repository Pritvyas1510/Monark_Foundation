import React from "react";
import Logo from "../../../../Public/Image/Logo.png";

const translations = {
  English: {
    title: "Member ID Card",
    blood: "Blood Group",
    mobile: "Mobile No.",
    dob: "Date of Birth",
    address: "Address",
    joined: "Joined On",
  },
  Hindi: {
    title: "सदस्य पहचान पत्र",
    blood: "ब्लड ग्रुप",
    mobile: "मोबाइल नंबर",
    dob: "जन्म तिथि",
    address: "पता",
    joined: "शामिल होने की तिथि",
  },
  Gujarati: {
    title: "સભ્ય ઓળખ કાર્ડ",
    blood: "બ્લડ ગ્રુપ",
    mobile: "મોબાઇલ નંબર",
    dob: "જન્મ તારીખ",
    address: "સરનામું",
    joined: "જોડાવાની તારીખ",
  },
};

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-GB") : "";

const IdCard = ({ member, language = "English" }) => {
  const t = translations[language];

  return (
    <div className="font-sans text-black flex justify-center">
      <div
        id="id-card"
        className="mx-auto w-[340px] print:block"
        style={{ pageBreakInside: "avoid" }}
      >
        <div className="w-[340px] min-h-[540px] bg-white rounded-2xl border-4 border-[#e65100] overflow-hidden shadow-2xl">
          <div className="h-2 bg-gradient-to-r from-[#e65100] via-[#ffb300] to-[#e65100]" />

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b-2 border-[#ffe0b2] gap-3">
            <div className="w-14 h-14 rounded-full border-2 border-[#e65100] bg-[#fff3e0] flex items-center justify-center">
              <img src={Logo} alt="Logo" />
            </div>

            <div className="flex-1 text-center">
              <h1 className="font-serif text-[#e65100] text-base font-bold leading-tight whitespace-nowrap">
                Monark Foundation
              </h1>
              <p className="text-[#ff8f00] text-[10px] tracking-widest uppercase mt-1 leading-tight">
                {t.title}
              </p>
            </div>

            <div className="w-14" />
          </div>

          {/* Photo */}
          <div className="flex flex-col items-center px-5 pt-5 pb-3.5 border-b-2 border-[#ffe0b2]">
            <div className="w-[100px] h-[120px] rounded-xl border-4 border-[#e65100] overflow-hidden bg-[#fff3e0] mb-3">
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  className="w-full h-full object-cover"
                  alt="Member"
                />
              ) : (
                <div className="text-6xl opacity-40 flex justify-center items-center h-full">
                  👤
                </div>
              )}
            </div>

            <div className="font-serif text-xl font-bold mb-1">
              {member.name}
            </div>

            <div className="  px-2 py-0.5 flex items-center gap-2">
              <span className="text-[9px]  w-[100px]font-semibold uppercase text-[#ff8f00]">
                ID 
              </span>
              <span className="text-[9px] font-bold text-[#e65100]">
                  {member.membershipId}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="px-5 py-3.5 border-b-2 border-[#ffe0b2] space-y-3 md:space-y-2 print:space-y-2">
            {/* ↑ increased base spacing, print-specific tighter */}
            <Row label={t.blood} value={member.bloodGroup} highlight />
            <Row label={t.mobile} value={member.phone} />
            <Row label={t.dob} value={formatDate(member.dob)} />
            <Row
              label={t.address}
              value={
                <span className="block max-w-[180px]  leading-snug">
                  {member.city}, {member.region}
                </span>
              }
            />
          </div>

          {/* Joined */}
          <div className="px-5 py-2.5 border-b-2 border-[#ffe0b2] text-center">
            <span className="text-[10px] font-bold uppercase text-[#e65100]">
              {t.joined} :
            </span>
            <span className="text-sm font-semibold ml-1">
              {formatDate(member.joinedOn)}
            </span>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 text-center text-[12px] text-gray-600 ">
            <p className="address">
              At & Post: Vahelal, Naroda Dahegam Road Ahmedabad 382330 Ph:
              02718-247215{" "}
            </p>

            <span className="block text-[#e65100] font-bold mt-1">
              🌐 www.monarkfoundation.ac.in
            </span>
          </div>

          <div className="h-2 bg-gradient-to-r from-[#e65100] via-[#ffb300] to-[#e65100]" />
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value, highlight }) => (
  <div className="flex items-start gap-1">
    <span className="text-[10px]  font-bold uppercase text-[#e65100] w-[130px] shrink-0 leading-8">
      {label}
    </span>

    <span className="font-bold text-[#ffb74d]">:</span>

    {highlight ? (
      <span className="bg-[#fff3e0]    border border-[#ffcc80] rounded-full px-2  text-xs font-bold text-[#e65100] leading-snug">
        {value}
      </span>
    ) : (
      <span className="text-sm font-medium  w-[280px] leading-snug">
        {value}
      </span>
    )}
  </div>
);

export default IdCard;
