const dotenv = require("dotenv");
dotenv.config();
const { PORT, MONGODB_URI, NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

module.exports = {
  PORT,
  MONGODB_URI,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
