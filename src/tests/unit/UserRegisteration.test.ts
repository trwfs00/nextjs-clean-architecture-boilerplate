import { UserRegistration } from "../../application/use-cases/UserRegistration"
import { User } from "../../domain/entities/User"
import { IUserRepository } from "../../domain/repositories/IUserRepository"

// Mock repository for testing
class MockUserRepository implements IUserRepository {
  private users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    // Simulate finding a user by email
    return this.users.find(user => user.email === email) || null
  }

  async save(user: User): Promise<void> {
    // Simulate saving a user
    this.users.push(user)
  }
}

describe("UserRegistration Use Case", () => {
  let userRepository: MockUserRepository
  let userRegistration: UserRegistration

  beforeEach(() => {
    // Initialize the mock repository and use case before each test
    userRepository = new MockUserRepository()
    userRegistration = new UserRegistration(userRepository)
  })

  it("should successfully register a new user", async () => {
    // Arrange
    const name = "John Doe"
    const email = "john@example.com"
    const password = "password123"

    // Act
    const user = await userRegistration.execute(name, email, password)

    // Assert
    expect(user).toBeInstanceOf(User) // Ensure user is an instance of the User class
    expect(user.email).toBe(email) // Check that the email matches
    expect(user.name).toBe(name) // Check that the name matches
    expect(user.password).toBe(password) // In a real-world scenario, this should be a hashed password
  })

  it("should throw an error if a user with the same email already exists", async () => {
    // Arrange
    const name = "John Doe"
    const email = "john@example.com"
    const password = "password123"

    // Register the first user
    await userRegistration.execute(name, email, password)

    // Act & Assert (expecting the second registration to throw an error)
    await expect(
      userRegistration.execute(name, email, password)
    ).rejects.toThrow("User already exists with this email")
  })
})
