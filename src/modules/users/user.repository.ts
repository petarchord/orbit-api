import { prisma } from "../../database/prisma.js";

export class UserRepository {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  create(data: { name: string; email: string; passwordHash: string }) {
    return prisma.user.create({
      data,
    });
  }
}
