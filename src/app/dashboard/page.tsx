"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Example logic to fetch the authenticated user's data
    // In real apps, this might be done via JWT tokens or sessions.
    async function fetchUser() {
      // Simulating fetching user data (this could be a call to /api/me or similar)
      const userData = await fetch("/api/me").then(res => res.json())

      if (userData) {
        setUser(userData)
      } else {
        router.push("/login") // Redirect to login if not authenticated
      }
    }

    fetchUser()
  }, [router])

  if (!user) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='max-w-7xl mx-auto p-6'>
        <h1 className='text-3xl font-bold text-gray-800'>
          Welcome, {user.name}!
        </h1>
        <p className='text-lg text-gray-600 mt-2'>
          This is your dashboard. Manage your account and view your data.
        </p>

        {/* Dashboard sections */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-4'>Profile Information</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-4'>Actions</h2>
            <p className='text-gray-700'>- Update your profile</p>
            <p className='text-gray-700'>- Manage your account</p>
            <p className='text-gray-700'>- View activity log</p>
          </div>
        </div>
      </div>
    </div>
  )
}
