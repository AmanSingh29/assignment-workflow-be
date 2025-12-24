const { AppError } = require("../utils/appError");
const { generateToken } = require("../utils/jwt");
const { UserModel } = require("../models");

async function handleSignup(req, res, next) {
  const { name, email, password, role } = req.body;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const user = await new UserModel({ name, email, password, role }).save();
  const token = generateToken(user);
  res.data = {
    statusCode: 201,
    message: "Signup Successfully",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
  next();
}

module.exports = {
  handleSignup,
};
