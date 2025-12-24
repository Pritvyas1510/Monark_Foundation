import { Counter } from "../model/Counter.model.js";

export const generateMemberId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "member" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return {
    memberNumber: counter.seq,
    memberId: `MF${counter.seq}`
  };
};
