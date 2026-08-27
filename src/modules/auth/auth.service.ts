import argon2 from "argon2";
import { type RegisterInput, type LoginInput } from "./auth.schema.js";
import { UserRepository } from "../users/user.repository.js";
import { SessionService } from "../session/session.service.js";
import { EmailAlreadyExistsError } from "../../errors/email-already-exist-error.js";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error.js";
import { UnauthorizedError } from "../../errors/unauthorized-error.js";

const userRepository = new UserRepository();
const sessionService = new SessionService();

export class AuthService {
  async register(input: RegisterInput) {
    const existingUser = await userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new EmailAlreadyExistsError();
    }

    const passwordHash = await argon2.hash(input.password);

    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash: passwordHash,
    });

    return user;
  }

  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const isPasswordValid = await argon2.verify(
      user.passwordHash,
      input.password,
    );
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }
    const session = await sessionService.create(user.id);
    return {
      user,
      session,
    };
  }

  async getCurrentUser(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError();
    }
    return user;
  }

  async logout(token: string) {
    await sessionService.delete(token);
  }
}
