"use server"

import { v4 as uuidv4 } from "uuid"
import { cookies } from "next/headers"
import type { Role } from "@/generated/prisma"
import { prisma } from "@/db/prisma"
import { getSession, getHomeRouteByRole } from "@/lib/auth"
import { hashPassword, comparePasswords } from "@/lib/password"
import { encryptData } from "@/lib/encryption"

// Register a new user
export async function registerUser({
  name,
  email,
  password,
  role,
}: {
  name: string
  email: string
  password: string
  role: string
}) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { success: false, error: "User with this email already exists" }
    }

    // Hash the password
    const hashedPassword = await hashPassword(password)

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as Role,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "Failed to register user" }
  }
}

// Create session - moved from auth.ts
export async function createSession(session: {
  id: string
  userId: string
  name: string
  email: string
  role: Role
}): Promise<void> {
  const encryptedSession = encryptData(JSON.stringify(session))
  const cookieStore = await cookies()
  cookieStore.set("session", encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })
}

// Delete session - moved from auth.ts
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

// Login user
export async function loginUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    // Verify password
    const passwordMatch = await comparePasswords(password, user.password)
    if (!passwordMatch) {
      return { success: false, error: "Invalid email or password" }
    }

    // Create session
    await createSession({
      id: uuidv4(),
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })

    return {
      success: true,
      role: user.role,
      redirectTo: user.role === "ADMIN" ? "/dashboard" : "/profile",
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Failed to login" }
  }
}

// Get user session
export async function getUserSession() {
  return getSession()
}

// Logout user - Modified to return a result instead of redirecting
export async function logoutUser() {
  try {
    await deleteSession()
    return { success: true }
  } catch (error) {
    console.error("Logout error:", error)
    return { success: false, error: "Failed to logout" }
  }
}

// Get redirect path based on role
export async function getRedirectPath() {
  const session = await getSession()
  if (!session) {
    return { path: "/login" }
  }

  const homeRoute = getHomeRouteByRole(session.role)
  return { path: homeRoute }
}
