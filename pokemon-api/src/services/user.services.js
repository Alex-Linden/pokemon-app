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

async function getUserFromDb(userId) {
  return await prisma.user.findUnique({
    where: { id: userId }
  });
}

async function deleteUserFromDb(userId) {
  return await prisma.user.delete({
    where: { id: userId },
  });
}

module.exports = {
  updateUserProfile,
  getUserFromDb,
  deleteUserFromDb,
};
