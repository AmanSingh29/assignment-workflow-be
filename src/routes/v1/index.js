const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const assignmentRoutes = require("./assignment");

router.use("/auth", authRoutes);

router.use("/assignment", assignmentRoutes);

module.exports = router;
