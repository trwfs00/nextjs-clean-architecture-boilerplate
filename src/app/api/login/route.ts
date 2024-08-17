import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository"
import { UserLogin } from "../../../application/use-cases/UserLogin"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  // Initialize repository and use case
  const userRepository = new PrismaUserRepository()
  const userLogin = new UserLogin(userRepository)

  try {
    // Execute login use case
    const user = await userLogin.execute(email, password)

    // Respond with the user details (in a real app, generate a session or token)
    return NextResponse.json(user)
  } catch (error: any) {
    return new NextResponse(error.message, { status: 401 })
  }
}
