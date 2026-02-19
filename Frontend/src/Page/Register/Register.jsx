import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerMember,
  resetRegisterState,
} from "../../Redux/slice/registerslice.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./Components/registerSchema";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import print from "print-js";
import IdCard from "./Components/IdCard.jsx";

const Register = ({ pdfUrl }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const { loading, success, error, member } = useSelector(
    (state) => state.memberRegister,
  );

  const [photo, setPhoto] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showModal, setShowModal] = useState(false);
  const [memberData, setMemberData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      language: "English",
      interestedInHead: false,
    },
  });

  // 🌐 Language switch
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);

    const map = { en: "English", hi: "Hindi", gu: "Gujarati" };
    const lang = map[lng];

    setSelectedLanguage(lang);
    setValue("language", lang);
  };

  // 🚀 Submit
  const onSubmit = (data) => {

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== "") {
        formData.append(key, data[key]);
      }
    });

    if (photo) formData.append("photo", photo);

    dispatch(registerMember(formData));
  };

  const handlePrint = () => {
    print({
      printable: "id-card",
      type: "html",
      scanStyles: true,
      targetStyles: ["*"],
      style: `
      @page { margin: 0; }

      body {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #id-card {
        width: 400px !important;
        height: auto !important;
        line-height: 1.4 !important;
      }

      #id-card * {
        line-height: 1 !important;
        gap-y:10px
    
      }

      .print-space {
        margin-bottom: 10px !important;
      }
      .address{
        font-size:10px;
        }
    `,
    });
  };

  // 🔔 Toast
  useEffect(() => {
    if (success && member) {
      toast.success("Registration successful 🎉");

      setMemberData(member);
      setShowModal(true);

      dispatch(resetRegisterState());
    }

    if (error) {
      toast.error(error);
      dispatch(resetRegisterState());
    }
  }, [success, error, member, dispatch]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-white flex justify-center px-4 py-6">
      <div className="max-w-7xl w-full grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* LEFT */}
        <div className="hidden md:flex flex-col bg-orange-500 text-white p-8">
          <h2 className="text-3xl font-bold mb-3">
            Monark Foundation Membership
          </h2>
          <p className="text-sm mb-4">
            Join us to create social impact across communities.
          </p>

          <div className="flex-1 rounded-xl overflow-hidden mb-6">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
              className="w-full h-full object-cover"
              alt="community"
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button className="bg-blue-700 px-4 py-2 rounded-xl">
              Learn More
            </button>
            <button className="bg-blue-700 px-4 py-2 rounded-xl">
              View Stories
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {/* Language */}
          <div className="flex justify-end gap-2 mb-4 text-black">
            {[
              { code: "en", label: "English" },
              { code: "hi", label: "Hindi" },
              { code: "gu", label: "Gujarati" },
            ].map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-3 py-1 text-xs rounded-full border transition
        ${
          selectedLanguage === lang.label
            ? "bg-orange-500 text-white border-orange-500"
            : "bg-white text-black hover:bg-orange-500 hover:text-white"
        }
      `}
              >
                {lang.code.toUpperCase()}
              </button>
            ))}
          </div>

          <h1 className="text-2xl mb-5 font-bold text-orange-600">
            {t("title")}
          </h1>

          {/* Hidden language field */}
          <input type="hidden" {...register("language")} />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 text-black"
          >
            <Input label={t("name")} error={errors.name?.message}>
              <input
                {...register("name")}
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </Input>

            <Input label={t("phone")} error={errors.phone?.message}>
              <input
                {...register("phone")}
                maxLength={10}
                placeholder="Phone"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </Input>

            <Input label={t("email")} error={errors.email?.message}>
              <input
                {...register("email")}
                placeholder="Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </Input>

            <Input label={t("dob")} error={errors.dob?.message}>
              <input
                type="date"
                {...register("dob")}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </Input>

            <Input label={t("address")} error={errors.address?.message}>
              <textarea
                {...register("address")}
                placeholder="Address"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </Input>

            <div className="grid grid-cols-2 gap-4">
              <Input label={t("gender")} error={errors.gender?.message}>
                <select
                  {...register("gender")}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </Input>
 
              <Input label={t("bloodGroup")} error={errors.bloodGroup?.message}>
                <select
                  {...register("bloodGroup")}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                >
                  <option value="">Select</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </Input>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label={t("city")} error={errors.city?.message}>
                <input
                  {...register("city")}
                  placeholder="City"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </Input>

              <Input label={t("Landmark")} error={errors.region?.message}>
                <input
                  {...register("region")}
                  placeholder="Region"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </Input>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("interestedInHead")} />
              {t("interestedInHead")}
            </label>

            {/* Upload */}
            <div className=" flex gap-2">
              <input
                type="file"
                id="photoUpload"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="photoUpload"
                className="cursor-pointer inline-block px-5 py-2 rounded-lg bg-blue-700 text-white text-sm font-medium hover:bg-orange-600 transition"
              >
                Upload Photo
              </label>
              {photo && <p className="text-sm mt-1">{photo.name}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Register Now"}
            </button>

            <Link to="/editdetails" className="block mt-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-orange-500 text-orange-500 hover:bg-blue-700 hover:text-white rounded-lg font-semibold transition duration-200"
              >
                <FiEdit size={18} />
                Edit Details
              </button>
            </Link>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-red-500"
            >
              ×
            </button>

            {/* ID Card only */}
            <div id="id-card" className="flex justify-center">
              <IdCard member={memberData} language={selectedLanguage} />
            </div>

            <button
              onClick={handlePrint}
              className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
            >
              Download ID Card (PDF)
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const Input = ({ label, error, children }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <div className="mt-1">{children}</div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default Register;
