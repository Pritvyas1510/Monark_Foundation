import { useEffect } from "react";
import "../Components/OtpModal.css"

const OtpModal = ({ open, onClose, onVerify, error }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className={`bg-white w-80 rounded-xl p-6 text-center transition
        ${error ? "animate-shake" : ""}`}
      >
        <h2 className="text-lg font-bold mb-4">Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border rounded-lg mb-3"
          onChange={(e) => onVerify(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-2">Invalid OTP</p>}

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
