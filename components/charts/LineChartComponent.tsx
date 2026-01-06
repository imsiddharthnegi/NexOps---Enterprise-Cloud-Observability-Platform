"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"

interface LineChartComponentProps {
  data: any[]
}

export function LineChartComponent({ data }: LineChartComponentProps) {
  return (
    <LineChart
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
      <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  )
}
