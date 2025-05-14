import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getUserSession } from "@/actions/auth-actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserManagement from "@/components/auth/user-management"
import LogoutButton from "@/components/auth/logout-button"

export default async function DashboardPage() {
  const session = await getUserSession()

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-gray-600">You need to be logged in as an admin to view this page.</p>
          <Button asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Only allow admins to access the dashboard
  if (session.role !== "ADMIN") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
          <Button asChild>
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <LogoutButton />
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Welcome, {session.name}!</h2>
          <p className="text-gray-600">You are logged in as an admin with {session.email}</p>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          <TabsContent value="settings">
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-2">System Settings</h3>
              <p className="text-gray-500">System settings will be available here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
