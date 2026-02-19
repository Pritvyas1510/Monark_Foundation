import { useEffect, useState } from "react";

const Countdown = ({ eventDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(eventDate) - new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      mins: Math.floor((difference / 1000 / 60) % 60),
      secs: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  if (!timeLeft) return null;

  const boxStyle =
    "w-20 h-20 md:w-24 md:h-24 rounded-xl flex items-center justify-center shadow-lg";

  return (
    <div className="flex gap-4 md:gap-6">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours", bordered: true },
        { value: timeLeft.mins, label: "Mins", bordered: true },
        { value: timeLeft.secs, label: "Secs", bordered: true },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className={`${boxStyle} ${
              item.bordered
                ? "bg-white border-2 border-orange-500 text-orange-500"
                : "bg-orange-500 text-white shadow-orange-300"
            }`}
          >
            <span className="text-3xl md:text-4xl font-black">
              {String(item.value).padStart(2, "0")}
            </span>
          </div>

          <span className="mt-3 text-xs font-bold uppercase tracking-widest text-orange-500">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Countdown;