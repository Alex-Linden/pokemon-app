function serializeUser(user) {
  if (!user) return null;

  return {
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

module.exports = {
  serializeUser,
};
