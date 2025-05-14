"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { registerUser } from "@/actions/auth-actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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

export function RegisterForm() {
  const router = useRouter()
  const [formState, setFormState] = useState<FormState>({})
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState("USER")

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    setFormState({})

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // Validate form data
      registerSchema.parse({ name, email, password, role })

      // Submit form data
      const result = await registerUser({ name, email, password, role })

      if (result.success) {
        setFormState({ success: true })
        // Redirect to login page after successful registration
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        setFormState({ errors: { _form: [result.error || "Registration failed"] } })
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
          <AlertDescription>Registration successful! Redirecting to login...</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Enter your name" autoComplete="name" required />
        {formState.errors?.name && <p className="text-sm text-red-500">{formState.errors.name.join(", ")}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="Enter your email" autoComplete="email" required />
        {formState.errors?.email && <p className="text-sm text-red-500">{formState.errors.email.join(", ")}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          required
        />
        {formState.errors?.password && <p className="text-sm text-red-500">{formState.errors.password.join(", ")}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <input type="hidden" name="role" value={role} />
        <Select value={role} onValueChange={setRole}>
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

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Register"}
      </Button>
    </form>
  )
}
