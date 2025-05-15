"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logoutUser } from "@/actions/auth-actions"

export default function LogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogout() {
    setIsLoading(true)
    try {
      const result = await logoutUser()
      if (result.success) {
        // Use client-side navigation instead of server redirect
        router.push("/login")
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleLogout} variant="ghost" size="sm" disabled={isLoading}>
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  )
}
