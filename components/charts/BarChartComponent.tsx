"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

interface BarChartComponentProps {
  data: any[]
}

export function BarChartComponent({ data }: BarChartComponentProps) {
  return (
    <BarChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  )
}
