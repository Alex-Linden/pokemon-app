import api from "./api";

// POST /auth/register
export const registerUser = async (formData) => {
  const res = await api.post("/auth/register", formData);
  return res.data;
};

// POST /auth/login
export const loginUser = async (formData) => {
  const res = await api.post("/auth/login", formData);
  return res.data;
};

// GET /me
export const fetchMe = async () => {
  const res = await api.get("/me");
  return res.data;
};

// PUT /me (update profile info)
export const updateProfile = async (formData) => {
  const res = await api.put("/me", formData);
  return res.data;
};
