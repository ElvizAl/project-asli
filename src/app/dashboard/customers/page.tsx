"use client"

import { useState } from "react"
import { ArrowUpDown, Download, Filter, MoreHorizontal, Search, UserPlus } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const customers = [
  {
    id: "CUST-001",
    name: "Budi Santoso",
    email: "budi@example.com",
    phone: "081234567890",
    orders: 12,
    totalSpent: 1250000,
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUST-002",
    name: "Siti Rahayu",
    email: "siti@example.com",
    phone: "081234567891",
    orders: 8,
    totalSpent: 875000,
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUST-003",
    name: "Ahmad Hidayat",
    email: "ahmad@example.com",
    phone: "081234567892",
    orders: 15,
    totalSpent: 1650000,
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUST-004",
    name: "Dewi Lestari",
    email: "dewi@example.com",
    phone: "081234567893",
    orders: 5,
    totalSpent: 450000,
    status: "inactive",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUST-005",
    name: "Eko Prasetyo",
    email: "eko@example.com",
    phone: "081234567894",
    orders: 10,
    totalSpent: 980000,
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUST-006",
    name: "Rina Wijaya",
    email: "rina@example.com",
    phone: "081234567895",
    orders: 3,
    totalSpent: 320000,
    status: "inactive",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUST-007",
    name: "Joko Susilo",
    email: "joko@example.com",
    phone: "081234567896",
    orders: 7,
    totalSpent: 750000,
    status: "active",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pelanggan</h2>
        <div className="flex space-x-2">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Tambah Pelanggan
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Ekspor
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pelanggan</CardTitle>
          <CardDescription>Kelola semua pelanggan toko Anda di sini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <div className="flex w-full md:w-auto items-center space-x-2">
              <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari nama, email, atau telepon..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Telepon</TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Pesanan</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Total Belanja</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Tidak ada pelanggan yang ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={customer.image || "/placeholder.svg"}
                              alt={customer.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-muted-foreground md:hidden">{customer.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{customer.phone}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>Rp {customer.totalSpent.toLocaleString("id-ID")}</TableCell>
                      <TableCell>
                        {customer.status === "active" ? (
                          <Badge className="bg-green-500">Aktif</Badge>
                        ) : (
                          <Badge variant="outline">Tidak Aktif</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Buka menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                            <DropdownMenuItem>Edit Pelanggan</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Riwayat Pesanan</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Hapus Pelanggan</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
