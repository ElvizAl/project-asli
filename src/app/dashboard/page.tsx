import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getUserSession, logoutUser } from "@/actions/auth-actions"
import LogoutButton from "@/components/auth/logout-button"

export default async function DashboardPage() {
  const session = await getUserSession()

  if (!session) {
    redirect("/login")
  }

  // Only allow admins to access the dashboard
  if (session.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col p-8">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Welcome, {session.name}!</h2>
        <p className="text-gray-600">You are logged in as an admin with {session.email}</p>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Admin Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <h4 className="font-medium">User Management</h4>
              <p className="text-sm text-gray-500">Manage user accounts and permissions</p>
            </div>
            <div className="p-4 border rounded-md">
              <h4 className="font-medium">Content Management</h4>
              <p className="text-sm text-gray-500">Manage website content and settings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
