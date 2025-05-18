"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    sales: 2100000,
  },
  {
    name: "Feb",
    sales: 1800000,
  },
  {
    name: "Mar",
    sales: 2800000,
  },
  {
    name: "Apr",
    sales: 2600000,
  },
  {
    name: "Mei",
    sales: 3200000,
  },
  {
    name: "Jun",
    sales: 3500000,
  },
]

export function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `Rp ${(value / 1000000).toFixed(1)}jt`}
        />
        <Tooltip
          formatter={(value: number) => [`Rp ${value.toLocaleString("id-ID")}`, "Penjualan"]}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
        />
        <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
