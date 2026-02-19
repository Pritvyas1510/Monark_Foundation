import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { CheckCircle, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  findMemberByPhone,
  updateMember,
  clearMember,
} from "../../../Redux/slice/editMember.slice";
import { useNavigate } from "react-router-dom";
import { editSchema } from "./editSchema";

import print from "print-js";
import IdCard from "./IdCard";

/* ================= PHONE VALIDATION ================= */

const mobileSchema = yup.object({
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter valid number")
    .required(),
});

const EditDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { member, loading, error } = useSelector((state) => state.editMember);

  const [step, setStep] = useState("phone");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [memberData, setMemberData] = useState(null);

  /* ================= PHONE FORM ================= */

  const {
    register: registerPhone,
    handleSubmit: handlePhoneSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(mobileSchema),
  });

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

  /* ================= EDIT FORM ================= */

  const {
    register,
    handleSubmit: handleEditSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
  });

  const phoneValue = watch("phone");
  const isPhoneValid = phoneValue?.length === 10;

  /* ================= ERROR HANDLING ================= */

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  /* ================= AUTO FILL FORM ================= */

  useEffect(() => {
    if (!member) return;

    Object.entries(member).forEach(([key, value]) => {
      if (key === "dob" && value) {
        setValue("dob", new Date(value).toISOString().split("T")[0]);
      } else if (key !== "photoUrl") {
        setValue(key, value);
      }
    });

    if (member.photoUrl) setPreview(member.photoUrl);
  }, [member, setValue]);

  /* ================= FIND MEMBER ================= */

  const findMemberHandler = async () => {
    try {
      await dispatch(findMemberByPhone(phoneValue)).unwrap();
      setStep("edit");
    } catch {}
  };

  /* ================= IMAGE HANDLING ================= */

  const handleImage = (file) => {
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setPhoto(null);
    setPreview(null);
  };

  /* ================= SUBMIT EDIT ================= */

const onEditSubmit = async (data) => {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        formData.append(key, value);
      } else if (value !== "" && value !== null) {
        formData.append(key, value);
      }
    });

    if (photo) formData.append("photo", photo);

    const updatedMember = await dispatch(
      updateMember({
        id: member._id,
        data: formData,
      })
    ).unwrap();

    toast.success("Details updated successfully");

    // ✅ OPEN MODAL WITH UPDATED DATA
    setMemberData(updatedMember);
    setShowModal(true);

  } catch (err) {
    console.error("Update Error:", err);
    toast.error("Update failed");
  }
};

  /* ================= UI ================= */

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-100 to-white flex justify-center px-4 py-2 text-black">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          {step === "phone" ? "Find Member" : "Edit Profile"}
        </h2>

        {/* 📱 PHONE STEP */}
        {step === "phone" && (
          <div>
            <form
              onSubmit={handlePhoneSubmit(findMemberHandler)}
              className="max-w-md mx-auto space-y-4"
            >
              <input
                {...registerPhone("phone")}
                maxLength={10}
                onInput={(e) =>
                  (e.target.value = e.target.value.replace(/\D/g, ""))
                }
                className="w-full h-12 px-4 rounded-xl border focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Enter mobile number"
              />

              <button
                disabled={!isPhoneValid || loading}
                className={`w-full h-12 rounded-xl text-white font-semibold ${
                  isPhoneValid
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-300"
                }`}
              >
                {loading ? "Searching..." : "Find Member"}
              </button>
            </form>
          </div>
        )}

        {/* ✏️ EDIT STEP */}
        {step === "edit" && member && (
          <div className="grid md:grid-cols-2 gap-10">
            <form
              onSubmit={handleEditSubmit(onEditSubmit)}
              className="space-y-5"
            >
              <p>Member ID: {member.membershipId}</p>

              <Input label="Name">
                <input
                  {...register("name")}
                  className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </Input>

              <Input label="Email">
                <input
                  {...register("email")}
                  className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </Input>

              <Input label="Gender">
                <select
                  {...register("gender")}
                  className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                >
                  <option value="">Select</option>
                  <option>male</option>
                  <option>female</option>
                </select>
              </Input>

              <Input label="Date of Birth">
                <input
                  type="date"
                  {...register("dob")}
                  className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </Input>

              <Input label="Blood Group">
                <select
                  {...register("bloodGroup")}
                  className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
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

              <Input label="Address">
                <textarea
                  {...register("address")}
                  className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </Input>

              <Input label="City">
                <input
                  {...register("city")}
                  className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </Input>

              <Input label="Landmark">
                <input
                  {...register("region")}
                  className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </Input>

              <label className="flex gap-2 text-sm">
                <input type="checkbox" {...register("interestedInHead")} />
                Interested in Head Responsibility
              </label>

              <div>
                <label className="text-sm flex gap-2">
                  Phone <CheckCircle size={16} className="text-green-500" />
                </label>
                <input
                  value={member.phone}
                  disabled
                  className="w-full px-4 py-1.5 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  disabled={loading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-xl font-semibold"
                >
                  {loading ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="flex-1 bg-gray-200 h-12 rounded-xl font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* 📷 IMAGE */}
            <div className="bg-orange-400 p-2 rounded-3xl flex items-center justify-center">
              {preview ? (
                <div className="relative">
                  <img src={preview} className="object-cover rounded-xl" />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer">
                  Upload Photo
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImage(e.target.files[0])}
                  />
                </label>
              )}
            </div>
          </div>
        )}
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
              <IdCard member={memberData} />
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

/* ================= INPUT WRAPPER ================= */

const Input = ({ label, children }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <div className="mt-1">{children}</div>
  </div>
);

export default EditDetails;
