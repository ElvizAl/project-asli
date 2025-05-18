"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Sample fruit data - in a real app, this would come from your database
const fruits = [
  {
    id: "1",
    name: "Apel Fuji",
    price: 25000,
    stock: 45,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jeruk Mandarin",
    price: 30000,
    stock: 32,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Pisang Cavendish",
    price: 18000,
    stock: 78,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Mangga Harum Manis",
    price: 35000,
    stock: 5,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function EditFruitPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fruit, setFruit] = useState({
    name: "",
    price: 0,
    stock: 0,
  })

  useEffect(() => {
    // Find the fruit by ID - in a real app, you would fetch this from your API/database
    const foundFruit = fruits.find((f) => f.id === id)
    if (foundFruit) {
      setFruit({
        name: foundFruit.name,
        price: foundFruit.price,
        stock: foundFruit.stock,
      })
    } else {
      // Redirect if fruit not found
      router.push("/dashboard/inventory")
    }
  }, [id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFruit((prev) => ({
      ...prev,
      [id]: id === "name" ? value : Number(value),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert(`Buah ${fruit.name} berhasil diperbarui!`)
      router.push("/dashboard/inventory")
    }, 1500)
  }

  const handleDelete = () => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${fruit.name}?`)) {
      // Simulate delete
      setTimeout(() => {
        alert(`${fruit.name} telah dihapus!`)
        router.push("/dashboard/inventory")
      }, 1000)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center">
        <Link href="/dashboard/inventory" className="mr-2">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Edit Buah</h2>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Detail Buah</CardTitle>
            <CardDescription>Edit informasi buah dalam inventaris</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Buah</Label>
                <Input id="name" placeholder="Masukkan nama buah" required value={fruit.name} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Harga (Rp)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  min="0"
                  required
                  value={fruit.price}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stok</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  min="0"
                  required
                  value={fruit.stock}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Gambar Buah</Label>
                <Input id="image" type="file" accept="image/*" />
                <p className="text-xs text-muted-foreground">Biarkan kosong jika tidak ingin mengubah gambar</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" type="button" onClick={() => router.push("/dashboard/inventory")}>
                Batal
              </Button>
              <Button variant="destructive" type="button" onClick={handleDelete}>
                Hapus
              </Button>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
