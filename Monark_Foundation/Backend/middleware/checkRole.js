export const allowRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Only Admin Can Make Sub Admin" });
  }
  next();
};