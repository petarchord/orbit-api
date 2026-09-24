import crypto from "crypto";
import { SessionRepository } from "./session.repository.js";

const sessionRepository = new SessionRepository();
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export class SessionService {
  async create(userId: string) {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = this.hashToken(rawToken);
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS); // 7 days

    await sessionRepository.create(tokenHash, userId, expiresAt);

    return {
      token: rawToken,
      expiresAt,
    };
  }

  async findValidSession(token: string) {
    const tokenHash = this.hashToken(token);
    const session = await sessionRepository.findByTokenHash(tokenHash);
    if (!session) {
      return null;
    }
    if (session.expiresAt <= new Date()) {
      return null;
    }
    return session;
  }

  async delete(token: string) {
    const tokenHash = this.hashToken(token);
    await sessionRepository.deleteByTokenHash(tokenHash);
  }

  hashToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }
}
