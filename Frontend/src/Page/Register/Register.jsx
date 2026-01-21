import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerMember } from "../../Redux/slice/registerslice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./Components/registerSchema";
import OtpModal from "./Components/OtpModal";
import { CheckCircle } from "lucide-react";

const Register = () => {
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(null);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const sendOtp = () => {
    setOtpOpen(true);
  };

  const verifyOtp = (otp) => {
    if (otp === "123456") {
      setOtpVerified(true);
      setOtpOpen(false);
      setOtpError(false);
    } else {
      setOtpError(true);
    }
  };

  const onSubmit = (data) => {
    if (!otpVerified) {
      alert("Please verify mobile number");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => formData.append(k, v));
    if (photo) formData.append("photo", photo);

    dispatch(registerMember(formData));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center px-4 text-black">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-orange-500 mb-2">
          Member Registration
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Please fill all required details
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* NAME */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              {...register("name")}
              placeholder="Enter full name"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-medium">Mobile Number</label>
            <div className="flex gap-2 mt-1 items-center">
              <input
                {...register("phone")}
                placeholder="10 digit mobile number"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              />

              {!otpVerified ? (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg"
                >
                  Verify
                </button>
              ) : (
                <CheckCircle className="text-green-500 w-7 h-7" />
              )}
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              {...register("email")}
              placeholder="Enter email address"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* GENDER */}
          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              {...register("gender")}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
            )}
          </div>

          {/* CITY */}
          <div>
            <label className="text-sm font-medium">City</label>
            <input
              {...register("city")}
              placeholder="Enter city"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* REGION */}
          <div>
            <label className="text-sm font-medium">Region</label>
            <input
              {...register("region")}
              placeholder="Enter region"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
            {errors.region && (
              <p className="text-red-500 text-xs mt-1">{errors.region.message}</p>
            )}
          </div>

          {/* PHOTO */}
          <div>
            <label className="text-sm font-medium">Photo</label>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full mt-1 text-sm"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition"
          >
            Register
          </button>
        </form>
      </div>

      {/* OTP MODAL */}
      <OtpModal
        open={otpOpen}
        onClose={() => setOtpOpen(false)}
        onVerify={verifyOtp}
        error={otpError}
      />
    </section>
  );
};

export default Register;
