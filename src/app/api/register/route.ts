import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository"
import { UserRegistration } from "../../../application/use-cases/UserRegistration"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()

  // Initialize the repository and use case
  const userRepository = new PrismaUserRepository()
  const userRegistration = new UserRegistration(userRepository)

  try {
    // Execute the use case to register a new user
    const newUser = await userRegistration.execute(name, email, password)

    // Return the new user as a JSON response
    return NextResponse.json(newUser)
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 })
  }
}
