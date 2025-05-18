"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    customers: 120,
  },
  {
    name: "Feb",
    customers: 145,
  },
  {
    name: "Mar",
    customers: 135,
  },
  {
    name: "Apr",
    customers: 150,
  },
  {
    name: "Mei",
    customers: 128,
  },
  {
    name: "Jun",
    customers: 142,
  },
]

export function CustomerAcquisition() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          formatter={(value: number) => [`${value} pelanggan`, "Pelanggan Baru"]}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
        />
        <Line type="monotone" dataKey="customers" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
