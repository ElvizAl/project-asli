"use server"

import { prisma } from "@/db/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { getUserSession } from "./auth-actions"

// Schema validasi untuk Customer
const customerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid").optional().nullable(),
  phone: z.string().min(10, "Nomor telepon tidak valid").optional().nullable(),
  address: z.string().optional().nullable()
})

// Ambil semua customer
export async function getCustomers() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { updatedAt: "desc" }
    })
    return { customers }
  } catch (error) {
    console.error("Error fetching customers:", error)
    return { error: "Gagal mengambil data pelanggan" }
  }
}

// Ambil detail customer berdasarkan ID
export async function getCustomerById(id: string) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: { orders: true }
    })
    
    if (!customer) {
      return { error: "Pelanggan tidak ditemukan" }
    }
    
    return { customer }
  } catch (error) {
    console.error(`Error fetching customer ${id}:`, error)
    return { error: "Gagal mengambil detail pelanggan" }
  }
}

// Buat customer baru
export async function createCustomer(prevState: any, formData: FormData) {
  // Ambil session user untuk mendapatkan userId
  const session = await getUserSession()
  
  if (!session) {
    return { error: "Anda harus login terlebih dahulu", status: 401 }
  }
  
  // Ambil data dari form
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string || null,
    phone: formData.get("phone") as string || null,
    address: formData.get("address") as string || null
  }
  
  // Validasi data
  const validatedFields = customerSchema.safeParse(rawData)
  
  if (!validatedFields.success) {
    return { 
      error: validatedFields.error.flatten().fieldErrors,
      status: 400 
    }
  }
  
  const { name, email, phone, address } = validatedFields.data
  
  try {
    // Cek apakah email sudah digunakan (jika email disediakan)
    if (email) {
      const existingCustomer = await prisma.customer.findUnique({
        where: { email }
      })
      
      if (existingCustomer) {
        return { 
          error: { email: ["Email sudah digunakan oleh pelanggan lain"] },
          status: 400 
        }
      }
    }
    
    // Buat customer baru
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address,
        userId: session.id // Kaitkan dengan user yang membuat
      }
    })
    
    revalidatePath("/dashboard/customers")
    return { 
      success: true,
      message: `Pelanggan ${name} berhasil ditambahkan!`,
      customer,
      status: 200 
    }
  } catch (error) {
    console.error("Error creating customer:", error)
    return { 
      success: false,
      message: "Gagal menambahkan pelanggan",
      status: 500 
    }
  }
}

// Update customer
export async function updateCustomer(id: string, prevState: any, formData: FormData) {
  // Verifikasi session
  const session = await getUserSession()
  
  if (!session) {
    return { error: "Anda harus login terlebih dahulu", status: 401 }
  }
  
  // Ambil data dari form
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string || null,
    phone: formData.get("phone") as string || null,
    address: formData.get("address") as string || null
  }
  
  // Validasi data
  const validatedFields = customerSchema.safeParse(rawData)
  
  if (!validatedFields.success) {
    return { 
      error: validatedFields.error.flatten().fieldErrors,
      status: 400 
    }
  }
  
  const { name, email, phone, address } = validatedFields.data
  
  try {
    // Cek apakah customer ada
    const existingCustomer = await prisma.customer.findUnique({
      where: { id }
    })
    
    if (!existingCustomer) {
      return { 
        success: false,
        message: "Pelanggan tidak ditemukan",
        status: 404 
      }
    }
    
    // Cek apakah email sudah digunakan oleh customer lain (jika email diubah)
    if (email && email !== existingCustomer.email) {
      const emailExists = await prisma.customer.findUnique({
        where: { email }
      })
      
      if (emailExists) {
        return { 
          error: { email: ["Email sudah digunakan oleh pelanggan lain"] },
          status: 400 
        }
      }
    }
    
    // Update customer
    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        address
      }
    })
    
    revalidatePath(`/dashboard/customers/${id}`)
    revalidatePath("/dashboard/customers")
    
    return { 
      success: true,
      message: `Data pelanggan ${name} berhasil diperbarui!`,
      customer: updatedCustomer,
      status: 200 
    }
  } catch (error) {
    console.error(`Error updating customer ${id}:`, error)
    return { 
      success: false,
      message: "Gagal memperbarui data pelanggan",
      status: 500 
    }
  }
}

// Hapus customer
export async function deleteCustomer(id: string) {
  // Verifikasi session
  const session = await getUserSession()
  
  if (!session) {
    return { error: "Anda harus login terlebih dahulu", status: 401 }
  }
  
  try {
    // Cek apakah customer ada
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: { orders: true }
    })
    
    if (!customer) {
      return { 
        success: false,
        message: "Pelanggan tidak ditemukan",
        status: 404 
      }
    }
    
    // Cek apakah customer memiliki order
    if (customer.orders.length > 0) {
      return { 
        success: false,
        message: "Tidak dapat menghapus pelanggan yang memiliki pesanan",
        status: 400 
      }
    }
    
    // Hapus customer
    await prisma.customer.delete({
      where: { id }
    })
    
    revalidatePath("/dashboard/customers")
    
    return { 
      success: true,
      message: `Pelanggan ${customer.name} berhasil dihapus!`,
       status: 200 
    }
  } catch (error) {
    console.error(`Error deleting customer ${id}:`, error)
    return { 
      success: false,
      message: "Gagal menghapus pelanggan",
      status: 500 
    }
  }
}

// Mencari customer berdasarkan kata kunci
export async function searchCustomers(query: string) {
  if (!query || query.trim() === "") {
    return getCustomers()
  }
  
  try {
    const customers = await prisma.customer.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { phone: { contains: query, mode: "insensitive" } },
          { address: { contains: query, mode: "insensitive" } }
        ]
      },
      orderBy: { updatedAt: "desc" }
    })
    
    return { customers }
  } catch (error) {
    console.error("Error searching customers:", error)
    return { error: "Gagal mencari data pelanggan" }
  }
}