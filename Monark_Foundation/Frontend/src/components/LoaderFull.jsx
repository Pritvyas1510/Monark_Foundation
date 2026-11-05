import Logo from "../../Public/Image/Logo.png";

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col items-center justify-center z-50">
      
      {/* Glow + Spinner Wrapper */}
      <div className="relative flex items-center justify-center">

        {/* Glow */}
        <div className="absolute inset-0 w-28 h-28 rounded-full bg-orange-400 blur-2xl opacity-80 animate-pulse"></div>

        {/* Spinning ring only */}
        <div className="w-24 h-24 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin relative z-10"></div>

        {/* Fixed logo in center (not spinning) */}
        <div className="absolute w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center z-20">
          <img
            src={Logo}
            alt="Monark Logo"
            className="w-10 h-10 object-contain"
          />
        </div>

      </div>

      {/* Loading text */}
      <p className="mt-6 text-orange-700 font-semibold tracking-widest animate-pulse">
        Loading Monark Foundation
      </p>
    </div>
  );
};

export default FullPageLoader;
