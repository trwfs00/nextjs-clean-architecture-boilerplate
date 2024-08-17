import { IUserRepository } from "../../domain/repositories/IUserRepository"
import { User } from "../../domain/entities/User"

export class GetUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<User | null> {
    // Fetch the user by email
    return this.userRepository.findByEmail(email)
  }
}
