const { signupService, loginService } = require("../services/auth.service");

async function handleSignup(req, res, next) {
  const result = await signupService(req.body);

  res.data = {
    statusCode: 201,
    message: "Signup successful",
    ...result,
  };
  next();
}

async function handleLogin(req, res, next) {
  const result = await loginService(req.body);

  res.data = {
    statusCode: 200,
    message: "Login successful",
    ...result,
  };
  next();
}

module.exports = {
  handleSignup,
  handleLogin,
};
