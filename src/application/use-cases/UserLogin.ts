import { IUserRepository } from "@domain/repositories/IUserRepository"
import { User } from "@domain/entities/User"

export class UserLogin {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<User | null> {
    // Find the user by email
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new Error("User not found")
    }

    // Check if the password matches (in a real app, compare the hashed password)
    if (user.password !== password) {
      throw new Error("Invalid password")
    }

    // Return the user (In real applications, generate a JWT or session token)
    return user
  }
}
