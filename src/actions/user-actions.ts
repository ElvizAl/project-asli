"use server"

import { prisma } from "@/db/prisma"
import { hashPassword } from "@/lib/password"
import { revalidatePath } from "next/cache"
import { getUserSession } from "@/actions/auth-actions"
import { redirect } from "next/navigation"

// Get all users
export async function getUsers() {
  const session = await getUserSession()

  if (!session || session.role !== "ADMIN") {
    return []
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return users
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

// Get user by ID
export async function getUserById(id: string) {
  const session = await getUserSession()

  if (!session || session.role !== "ADMIN") {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error)
    return null
  }
}

// Create a new user
export async function createUser({
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
  const session = await getUserSession()

  if (!session || session.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" }
  }

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
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as "USER" | "ADMIN",
      },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error creating user:", error)
    return { success: false, error: "Failed to create user" }
  }
}

// Update an existing user
export async function updateUser({
  id,
  name,
  email,
  password,
  role,
}: {
  id: string
  name: string
  email: string
  password?: string
  role: string
}) {
  const session = await getUserSession()

  if (!session || session.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" }
  }

  try {
    // Check if email is already taken by another user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser && existingUser.id !== id) {
      return { success: false, error: "Email is already taken by another user" }
    }

    // Prepare update data
    const updateData: any = {
      name,
      email,
      role: role as "USER" | "ADMIN",
    }

    // Only update password if provided
    if (password) {
      updateData.password = await hashPassword(password)
    }

    // Update user
    await prisma.user.update({
      where: { id },
      data: updateData,
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error(`Error updating user ${id}:`, error)
    return { success: false, error: "Failed to update user" }
  }
}

// Delete a user
export async function deleteUser(id: string) {
  const session = await getUserSession()

  if (!session || session.role !== "ADMIN") {
    redirect("/login")
  }

  // Prevent deleting yourself
  if (session.userId === id) {
    throw new Error("You cannot delete your own account")
  }

  try {
    await prisma.user.delete({
      where: { id },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error)
    throw error
  }
}
