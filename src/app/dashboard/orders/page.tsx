"use client"

import { useState } from "react"
import { ArrowUpDown, Calendar, Download, Filter, MoreHorizontal, Search } from "lucide-react"
import Link from "next/link"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const orders = [
  {
    id: "ORD-001",
    customer: "Budi Santoso",
    date: "2023-05-13",
    total: 125000,
    status: "completed",
    items: 5,
    payment: "transfer",
  },
  {
    id: "ORD-002",
    customer: "Siti Rahayu",
    date: "2023-05-13",
    total: 87500,
    status: "processing",
    items: 3,
    payment: "cash",
  },
  {
    id: "ORD-003",
    customer: "Ahmad Hidayat",
    date: "2023-05-12",
    total: 210000,
    status: "completed",
    items: 7,
    payment: "transfer",
  },
  {
    id: "ORD-004",
    customer: "Dewi Lestari",
    date: "2023-05-12",
    total: 65000,
    status: "cancelled",
    items: 2,
    payment: "cash",
  },
  {
    id: "ORD-005",
    customer: "Eko Prasetyo",
    date: "2023-05-11",
    total: 175000,
    status: "completed",
    items: 6,
    payment: "transfer",
  },
  {
    id: "ORD-006",
    customer: "Rina Wijaya",
    date: "2023-05-11",
    total: 95000,
    status: "processing",
    items: 4,
    payment: "cash",
  },
  {
    id: "ORD-007",
    customer: "Joko Susilo",
    date: "2023-05-10",
    total: 135000,
    status: "completed",
    items: 5,
    payment: "transfer",
  },
  {
    id: "ORD-008",
    customer: "Maya Indah",
    date: "2023-05-10",
    total: 45000,
    status: "processing",
    items: 2,
    payment: "cash",
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Selesai</Badge>
      case "processing":
        return <Badge className="bg-blue-500">Diproses</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Dibatalkan</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pesanan</h2>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Ekspor Data
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pesanan</CardTitle>
          <CardDescription>Kelola semua pesanan pelanggan di sini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <div className="flex w-full md:w-auto items-center space-x-2">
              <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari ID atau pelanggan..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="processing">Diproses</SelectItem>
                  <SelectItem value="cancelled">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>ID Pesanan</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead className="hidden md:table-cell">
                    <div className="flex items-center space-x-1">
                      <span>Tanggal</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Jumlah Item</TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Total</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Pembayaran</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Tidak ada pesanan yang ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                      <TableCell className="hidden md:table-cell">{order.items}</TableCell>
                      <TableCell>Rp {order.total.toLocaleString("id-ID")}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="hidden md:table-cell capitalize">{order.payment}</TableCell>
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
                            <DropdownMenuItem>
                              <Link href={`/dashboard/orders/${order.id}`} className="w-full">
                                Lihat Detail
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Ubah Status</DropdownMenuItem>
                            <DropdownMenuItem>Cetak Invoice</DropdownMenuItem>
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
