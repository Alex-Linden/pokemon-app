const { register, login } = require("../services/auth.services");

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const token = await register(name, email, password);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = { registerUser, loginUser };
