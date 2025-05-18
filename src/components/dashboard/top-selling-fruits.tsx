"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Mangga",
    sales: 245,
  },
  {
    name: "Apel",
    sales: 185,
  },
  {
    name: "Pisang",
    sales: 165,
  },
  {
    name: "Jeruk",
    sales: 132,
  },
  {
    name: "Alpukat",
    sales: 102,
  },
]

export function TopSellingFruits() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis dataKey="name" type="category" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          formatter={(value: number) => [`${value} buah`, "Terjual"]}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
          cursor={{ fill: "hsl(var(--muted))" }}
        />
        <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
