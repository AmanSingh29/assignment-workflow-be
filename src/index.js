const express = require("express");
const { PORT } = require("./config");
const { connectDB } = require("./config/db");
const app = express();

// DB connection
connectDB();

app.listen(PORT, () => {
  console.log(`------------ Server Started At ${PORT} ------------`);
});
