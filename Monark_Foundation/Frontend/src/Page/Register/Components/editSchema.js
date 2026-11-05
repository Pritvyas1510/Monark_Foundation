import * as yup from "yup";

export const editSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  gender: yup.string().required(),
  dob: yup.string().required(),
  bloodGroup: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  region: yup.string().required(),
  interestedInHead: yup.boolean(),
});
