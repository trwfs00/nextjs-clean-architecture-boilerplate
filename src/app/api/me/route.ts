import { PrismaUserRepository } from "../../../infrastructure/repositories/PrismaUserRepository"
import { GetUser } from "../../../application/use-cases/GetUser"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // For simplicity, we're assuming the user email is available in the request headers
  const email = req.headers.get("x-user-email")

  if (!email) {
    return new NextResponse("User email not provided", { status: 401 })
  }

  // Initialize repository and use case
  const userRepository = new PrismaUserRepository()
  const getUser = new GetUser(userRepository)

  try {
    // Execute getUser use case
    const user = await getUser.execute(email)

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 })
  }
}
