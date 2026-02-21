import React, { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
  todo: "#3b82f6",
  "In-progress": "#f59e0b",
  "In-review": "#a855f7",
  done: "#22c55e",
};

export default function DonutChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0),
    [data],
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-xl border border-gray-200 px-4 py-2 rounded-xl text-sm">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-gray-500">{payload[0].value} tasks</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-4 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Task Distribution
      </h2>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-full sm:flex-1 h-[220px] sm:h-[260px] lg:h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="65%"
                outerRadius="85%"
                paddingAngle={4}
                activeIndex={activeIndex}
                activeOuterRadius={95}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[entry.name] || "#6366f1"} />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {total}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">Total Tasks</p>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full sm:w-auto flex flex-col justify-center space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[item.name] }}
              />
              <span className="text-sm text-gray-700 flex-1">{item.name}</span>
              <span className="text-sm font-medium text-gray-900">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
