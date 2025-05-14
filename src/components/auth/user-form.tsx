"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUser, updateUser } from "@/actions/user-actions"
import { toast } from "sonner"

// Define the user schema
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  role: z.enum(["USER", "ADMIN"]),
})

type FormState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
    role?: string[]
    _form?: string[]
  }
  success?: boolean
}

type User = {
  id: string
  name: string
  email: string
  role: "USER" | "ADMIN"
}

interface UserFormProps {
  user?: User
}

export default function UserForm({ user }: UserFormProps) {
  const router = useRouter()
  const [formState, setFormState] = useState<FormState>({})
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<"USER" | "ADMIN">(user?.role || "USER")

  const isEditing = !!user

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    setFormState({})

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string | undefined

    try {
      // For editing, make password optional
      const schemaToUse = isEditing
        ? userSchema.omit({ password: true }).extend({
            password: z.string().min(6).optional(),
          })
        : userSchema

      // Validate form data
      schemaToUse.parse({ name, email, password, role })

      if (isEditing) {
        // Update existing user
        const result = await updateUser({
          id: user.id,
          name,
          email,
          password: password || undefined, // Only update password if provided
          role,
        })

        if (result.success) {
          toast.success("user terupdated")
          router.push("/dashboard")
          router.refresh()
        } else {
          setFormState({ errors: { _form: [result.error || "Failed to update user"] } })
        }
      } else {
        // Create new user
        const result = await createUser({
          name,
          email,
          password: password!, // Password is required for new users
          role,
        })

        if (result.success) {
          toast.success("user telah terbuat")
          router.push("/dashboard")
          router.refresh()
        } else {
          setFormState({ errors: { _form: [result.error || "Failed to create user"] } })
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors
        setFormState({ errors })
      } else {
        setFormState({ errors: { _form: ["Something went wrong. Please try again."] } })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={onSubmit} className="space-y-6">
      {formState.errors?._form && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{formState.errors._form.join(", ")}</AlertDescription>
        </Alert>
      )}

      {formState.success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{isEditing ? "User updated successfully!" : "User created successfully!"}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Enter user name" defaultValue={user?.name || ""} required />
        {formState.errors?.name && <p className="text-sm text-red-500">{formState.errors.name.join(", ")}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter user email"
          defaultValue={user?.email || ""}
          required
        />
        {formState.errors?.email && <p className="text-sm text-red-500">{formState.errors.email.join(", ")}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          Password {isEditing && <span className="text-gray-500 text-sm">(Leave blank to keep current password)</span>}
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder={isEditing ? "Enter new password (optional)" : "Enter password"}
          required={!isEditing}
        />
        {formState.errors?.password && <p className="text-sm text-red-500">{formState.errors.password.join(", ")}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <input type="hidden" name="role" value={role} />
        <Select value={role} onValueChange={(value) => setRole(value as "USER" | "ADMIN")}>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
        {formState.errors?.role && <p className="text-sm text-red-500">{formState.errors.role.join(", ")}</p>}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (isEditing ? "Updating..." : "Creating...") : isEditing ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  )
}
