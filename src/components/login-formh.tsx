"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { loginUser } from "@/actions/auth-actions"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

type FormState = {
  errors?: {
    email?: string[]
    password?: string[]
    _form?: string[]
  }
}

export function LoginForm() {
  const router = useRouter()
  const [formState, setFormState] = useState<FormState>({})
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    setIsLoading(true)
    setFormState({})

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // Validate form data
      loginSchema.parse({ email, password })

      // Submit form data
      const result = await loginUser({ email, password })

      if (result.success) {
        // Use client-side navigation instead of server redirect
        if (result.redirectTo) {
          router.push(result.redirectTo)
        } else if (result.role === "ADMIN") {
          router.push("/dashboard")
        } else {
          router.push("/")
        }
      } else {
        setFormState({ errors: { _form: [result.error || "Invalid email or password"] } })
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
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />
        {formState.errors?.password && <p className="text-sm text-red-500">{formState.errors.password.join(", ")}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  )
}
