"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Apel", value: 25 },
  { name: "Jeruk", value: 18 },
  { name: "Pisang", value: 15 },
  { name: "Mangga", value: 22 },
  { name: "Lainnya", value: 20 },
]

const COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#6b7280"]

export function SalesByCategory() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [`${value}%`, "Persentase Penjualan"]}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
