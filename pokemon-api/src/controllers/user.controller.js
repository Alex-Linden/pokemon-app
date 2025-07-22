const { updateUserProfile } = require("../services/user.services");
const { serializeUser } = require("../utils/serializeUser");

async function updateMe(req, res) {
  const userId = req.user.id;
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  try {
    const updatedUser = await updateUserProfile(userId, { name, email });
    res.json({ message: "Profile updated", user: serializeUser(updatedUser) });
  } catch (err) {
    console.error("❌ Error updating profile:", err);

    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      return res.status(409).json({ error: "Email already in use" });
    }

    res.status(500).json({ error: "Failed to update profile" });
  }
}

module.exports = {
  updateMe,
};
