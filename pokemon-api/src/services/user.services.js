const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function updateUserProfile(userId, updates) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      ...(updates.name && { name: updates.name }),
      ...(updates.email && { email: updates.email }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

module.exports = {
  updateUserProfile,
};
