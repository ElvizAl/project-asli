"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Phone, MapPin, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const ProfilePage = () => {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nohp: "",
    alamat: "",
    jenisKelamin: "laki-laki", // Default value
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, jenisKelamin: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsPending(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Here you would typically send the form data to your API
      // const response = await fetch("/api/profile", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // })

      toast.success("Data Berhasil Disimpan")

      // Optionally redirect after successful save
      // router.push("/dashboard")
    } catch (error) {
      console.error(error)
      toast.error("Gagal Menyimpan Data")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center">
        <h2 className="text-3xl font-bold tracking-tight">Profil Saya</h2>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Data Profil</CardTitle>
            <CardDescription>Lengkapi informasi profil Anda di bawah ini</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Nama Lengkap
              </Label>
              <Input
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Masukkan alamat email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nohp" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Nomor HP
              </Label>
              <Input
                id="nohp"
                name="nohp"
                type="tel"
                value={formData.nohp}
                onChange={handleInputChange}
                placeholder="Masukkan nomor HP"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alamat" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Alamat
              </Label>
              <Textarea
                id="alamat"
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                placeholder="Masukkan alamat lengkap"
                rows={3}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Batal
            </Button>
            <Button type="submit" disabled={isPending} className="gap-2">
              {isPending ? (
                "Menyimpan..."
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Simpan Profil
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default ProfilePage
