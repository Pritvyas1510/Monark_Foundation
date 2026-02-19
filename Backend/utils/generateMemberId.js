// import Member from "../model/Member.model.js";

// export const generateMemberId = async () => {
//   const lastMember = await Member.findOne({})
//     .sort({ createdAt: -1 })
//     .select("membershipId");

//   let nextNumber = 1;

//   if (lastMember?.membershipId) {
//     const lastNumber = parseInt(
//       lastMember.membershipId.replace("MF", ""),
//       10
//     );
//     nextNumber = lastNumber + 1;
//   }

//   return `MF${String(nextNumber).padStart(7, "0")}`;
// };

import Member from "../model/Member.model.js";

export const generateMemberId = async () => {
  const lastMember = await Member.findOne({})
    .sort({ membershipId: -1 })   // 🔥 important change
    .select("membershipId");

  let nextNumber = 1;

  if (lastMember?.membershipId) {
    nextNumber =
      parseInt(lastMember.membershipId.replace("MF", ""), 10) + 1;
  }

  return `MF${String(nextNumber).padStart(7, "0")}`;
};
