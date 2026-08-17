import argon2 from "argon2";
import { type RegisterInput } from "./auth.schema.js";
import { UserRepository } from "../users/user.repository.js";
import { EmailAlreadyExistsError } from "../../errors/email-already-exist-error.js";

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
}
