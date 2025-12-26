const express = require("express");
const { PORT } = require("./config");
const { connectDB } = require("./config/db");
const app = express();
const cors = require("cors");
const apiRoutes = require("./routes");
const globalErrorHandlerMw = require("./middlewares/globalErrorHandler");

app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// Models
require("./models");

//Routes
app.use("/api", apiRoutes);

// Global Error Handler
app.use(globalErrorHandlerMw);

app.listen(PORT, () => {
  console.log(`------------ Server Started At ${PORT} ------------`);
});
