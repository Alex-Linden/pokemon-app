const express = require("express");
const { updateMe } = require("../controllers/user.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.patch("/me", requireAuth, updateMe);

module.exports = router;
