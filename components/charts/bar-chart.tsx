"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function SimpleBarChart({
  data,
  dataKey,
  labelKey,
  color = "#4f46e5",
  height = 260,
  unit = "",
}: {
  data: Record<string, string | number>[];
  dataKey: string;
  labelKey: string;
  color?: string;
  height?: number;
  unit?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
        <XAxis
          dataKey={labelKey}
          tick={{ fontSize: 12, fill: "#71717a" }}
          axisLine={{ stroke: "#e4e4e7" }}
          tickLine={false}
        />
        <YAxis tick={{ fontSize: 12, fill: "#71717a" }} axisLine={false} tickLine={false} width={40} />
        <Tooltip
          cursor={{ fill: "#f4f4f5" }}
          contentStyle={{ borderRadius: 10, border: "1px solid #e4e4e7", fontSize: 13 }}
          formatter={(value) => [`${value}${unit}`, ""]}
        />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}
