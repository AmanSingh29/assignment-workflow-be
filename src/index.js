const express = require("express");
const { PORT } = require("./config");
const { connectDB } = require("./config/db");
const app = express();
const apiRoutes = require("./routes");

// DB connection
connectDB();

// Models
require("./models");

//Routes
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`------------ Server Started At ${PORT} ------------`);
});
