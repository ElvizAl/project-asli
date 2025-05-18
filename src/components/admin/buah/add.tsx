"use client"

import type React from "react"

import { useState, useRef, useTransition, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CloudUpload, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { BarLoader } from "react-spinners"
import { toast } from "@/components/ui/use-toast"

const AddFruitPage = () => {
  const router = useRouter()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState("")
  const [message, setMessage] = useState("")
  const [pending, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = () => {
    if (!inputFileRef.current?.files) return null
    const file = inputFileRef.current.files[0]

    // Reset message before new upload
    setMessage("")

    const formData = new FormData()
    formData.set("file", file)

    startTransition(async () => {
      try {
        const response = await fetch("/api/upload", {
          method: "PUT",
          body: formData,
        })

        const data = await response.json()
        if (response.status !== 200) {
          setMessage(data.message)
          return
        }

        // Access the blob URL correctly from the response
        setImage(data.blob.url)
        toast({
          title: "Image uploaded successfully",
          description: "Your image has been uploaded and is ready to use.",
          variant: "default",
        })
      } catch (error) {
        console.error(error)
        setMessage("Error uploading image")
        toast({
          title: "Upload failed",
          description: "There was a problem uploading your image. Please try again.",
          variant: "destructive",
        })
      }
    })
  }

  const handleRemoveImage = () => {
    setImage("")
    if (inputFileRef.current) {
      inputFileRef.current.value = ""
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!image) {
      setMessage("Please upload an image first")
      return
    }

    startTransition(async () => {
      try {
        // Here you would typically send the form data to your API
        // For example:
        // const response = await fetch("/api/fruits", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     name: formData.name,
        //     price: Number(formData.price),
        //     stock: Number(formData.stock),
        //     imageUrl: image
        //   }),
        // })

        // For now, we'll just simulate a successful submission
        toast({
          title: "Fruit added successfully",
          description: `${formData.name} has been added to inventory.`,
          variant: "default",
        })

        // Redirect to inventory page
        router.push("/dashboard/inventory")
      } catch (error) {
        console.error(error)
        toast({
          title: "Error adding fruit",
          description: "There was a problem adding the fruit to inventory.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center">
        <Link href="/dashboard/inventory" className="mr-2">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Tambah Buah Baru</h2>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Detail Buah</CardTitle>
            <CardDescription className="mb-2">
              Masukkan informasi buah yang akan ditambahkan ke inventaris
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Buah</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama buah"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="mt-1">
                  Harga (Rp)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="mt-1">
                  Stok Awal
                </Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="image">Gambar Buah</Label>
                <div className="flex flex-col w-full max-w-[640px] h-[360px] mt-2 mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 relative">
                  {!image ? (
                    <>
                      <Label htmlFor="input-file" className="flex flex-col items-center justify-center w-full h-full">
                        <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
                          <div className="flex flex-col items-center justify-center">
                            {pending ? <BarLoader /> : null}
                            <CloudUpload size={32} className="w-8 h-8 mb-1" />
                            <p className="mb-1 text-sm font-bold">Upload Gambar</p>
                            {message ? (
                              <p className="text-xs text-red-500">{message}</p>
                            ) : (
                              <p className="text-xs">SVG, PNG, JPG, GIF, atau yang lainnya (max:4MB)</p>
                            )}
                          </div>
                        </div>
                        <input
                          id="input-file"
                          ref={inputFileRef}
                          onChange={handleImageUpload}
                          name="input-file"
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </Label>
                    </>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image src={image || "/placeholder.svg"} alt="Preview" fill className="rounded-md object-cover" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 z-10"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-3">
            <Button variant="outline" type="button" onClick={() => router.push("/dashboard/inventory")}>
              Batal
            </Button>
            <Button type="submit" disabled={pending || !image}>
              {pending ? "Menyimpan..." : "Simpan"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default AddFruitPage