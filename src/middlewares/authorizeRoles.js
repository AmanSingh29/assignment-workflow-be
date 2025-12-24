const { AppError } = require("../utils/appError");

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new AppError("Forbidden: Access denied", 403);
    }
    next();
  };
};

module.exports = {
  authorizeRoles,
};
