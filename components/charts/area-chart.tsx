"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function SimpleAreaChart({
  data,
  dataKey,
  labelKey,
  color = "#4f46e5",
  height = 260,
  unit = "",
  domain,
}: {
  data: Record<string, string | number>[];
  dataKey: string;
  labelKey: string;
  color?: string;
  height?: number;
  unit?: string;
  domain?: [number, number];
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.25} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
        <XAxis
          dataKey={labelKey}
          tick={{ fontSize: 12, fill: "#71717a" }}
          axisLine={{ stroke: "#e4e4e7" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#71717a" }}
          axisLine={false}
          tickLine={false}
          width={40}
          domain={domain}
        />
        <Tooltip
          contentStyle={{ borderRadius: 10, border: "1px solid #e4e4e7", fontSize: 13 }}
          formatter={(value) => [`${value}${unit}`, ""]}
        />
        <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill="url(#areaFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
