import React from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { MoreVertical, TrendingUp } from "lucide-react";

export default function KpiAreaCard({
  title,
  value,
  percent,
  percentColor = "text-green-600",
  data,
  stroke = "#3b82f6",
  gradientId = "kpiGradient",
  bg = "bg-gray-50",
}) {
  return (
    <div
      className={`${bg} rounded-3xl p-6 flex flex-col h-full min-h-[220px] transition-all duration-200 hover:shadow-md`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500 font-medium">{title}</span>
        <MoreVertical size={16} className="text-gray-400" />
      </div>

      {/* Chart Section (centered properly) */}
      <div className="flex-1 flex items-center">
        <div className="h-20 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={stroke} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="value"
                stroke={stroke}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-4">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>

        {percent !== undefined && (
          <div
            className={`flex items-center text-sm font-medium ${percentColor}`}
          >
            <TrendingUp size={14} className="mr-1" />
            {percent}%
          </div>
        )}
      </div>
    </div>
  );
}
