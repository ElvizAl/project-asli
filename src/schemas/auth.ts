import { SendToBack } from "lucide-react"
import { coerce, z } from "zod"

export const fruitSchema = z.object({
  name: z.string().min(2),
  price: coerce.number().gt(0),
  stock: coerce.number().gt(0),
})

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})