import argon2 from "argon2";
import { type RegisterInput, type LoginInput } from "./auth.schema.js";
import { UserRepository } from "../users/user.repository.js";
import { EmailAlreadyExistsError } from "../../errors/email-already-exist-error.js";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error.js";

const userRepository = new UserRepository();

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
    return user;
  }
}
