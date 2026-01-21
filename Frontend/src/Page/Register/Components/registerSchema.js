import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  email: yup.string().email("Invalid email").nullable(),
  gender: yup.string().required("Gender is required"),
  city: yup.string().required("City is required"),
  region: yup.string().required("Region is required"),
});
