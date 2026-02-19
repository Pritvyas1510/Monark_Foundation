import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Name is required"),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Phone is required"),

  email: yup.string().email("Invalid email").nullable(),

  gender: yup.string().required("Gender is required"),

  dob: yup.date().required("Date of birth required"),

  bloodGroup: yup.string().required("Blood group required"),

  language: yup.string().required("Language required"),

  address: yup.string().required("Address required"),

  city: yup.string().required("City required"),

  region: yup.string().required("Region required"),

  interestedInHead: yup.boolean(),
});
