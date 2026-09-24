import { prisma } from "../../database/prisma.js";

export class SessionRepository {
  create(tokenHash: string, userId: string, expiresAt: Date) {
    return prisma.session.create({
      data: {
        tokenHash,
        userId,
        expiresAt,
      },
    });
  }

  findByTokenHash(tokenHash: string) {
    return prisma.session.findUnique({
      where: { tokenHash },
      include: {
        user: true,
      },
    });
  }

  deleteByTokenHash(tokenHash: string) {
    return prisma.session.deleteMany({
      where: { tokenHash },
    });
  }
}
