const { AppError } = require("../utils/appError");
const { generateToken } = require("../utils/jwt");
const { UserModel } = require("../models");

async function signupService({ name, email, password, role }) {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const user = await UserModel.create({ name, email, password, role });
  const token = generateToken(user);

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

async function loginService({ email, password }) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

module.exports = {
  signupService,
  loginService,
};
