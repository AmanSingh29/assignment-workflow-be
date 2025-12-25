const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const assignmentRoutes = require("./assignment");
const submissionRoutes = require("./submission");

router.use("/auth", authRoutes);

router.use("/assignment", assignmentRoutes);

router.use("/submission", submissionRoutes);

module.exports = router;
