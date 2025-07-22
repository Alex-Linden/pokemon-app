const { register, login } = require("../services/auth.services");
const { serializeUser } = require("../utils/serializeUser");

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const [token, newUser] = await register(name, email, password);
    res.status(201).json({
      message: "Registration successful",
      token,
      user: serializeUser(newUser),
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const [token, user] = await login(email, password);
    res.json({
      message: "Login successful",
      token,
      user: serializeUser(user)
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = { registerUser, loginUser };
