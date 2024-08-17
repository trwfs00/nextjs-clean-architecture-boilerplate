import { IUserRepository } from "@domain/repositories/IUserRepository"
import { User } from "@domain/entities/User"
import { v4 as uuidv4 } from "uuid" // For generating unique IDs (use a real UUID or other method in production)

export class UserRegistration {
  constructor(private userRepository: IUserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    // Check if the user already exists
    const existingUser = await this.userRepository.findByEmail(email)
    if (existingUser) {
      throw new Error("User already exists with this email")
    }

    // In a real application, you should hash the password before saving
    const hashedPassword = password // Replace this with actual hashing logic

    // Create new user
    const newUser = new User(uuidv4(), name, email, hashedPassword, new Date())

    // Save new user in the repository
    await this.userRepository.save(newUser)

    return newUser
  }
}
