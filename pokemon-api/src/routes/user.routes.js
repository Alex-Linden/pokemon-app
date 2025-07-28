const express = require("express");
const { updateMe, getMe } = require("../controllers/user.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.patch("/me", requireAuth, updateMe);
router.get("/me", requireAuth, getMe);

module.exports = router;
