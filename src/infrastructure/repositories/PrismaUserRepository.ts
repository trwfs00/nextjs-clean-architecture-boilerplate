import { PrismaClient } from "@prisma/client"
import { IUserRepository } from "../../domain/repositories/IUserRepository"
import { User } from "../../domain/entities/User"

const prisma = new PrismaClient()

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const userRecord = await prisma.user.findUnique({
      where: { email },
    })

    if (!userRecord) return null

    return new User(
      userRecord.id,
      userRecord.name,
      userRecord.email,
      userRecord.password,
      userRecord.createdAt
    )
  }

  async save(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password, // You should hash the password in real apps
        createdAt: user.createdAt,
      },
    })
  }
}
