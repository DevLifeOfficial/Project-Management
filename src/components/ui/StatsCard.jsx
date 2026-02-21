import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend = "neutral",
  className = "",
  color,
}) {
  return (
    <div
      className={`
        relative
        ${color ? color : "bg-black"}
        rounded-2xl
        p-4 sm:p-5 md:p-6
        shadow-sm
        border border-white/10
        hover:shadow-lg
        transition-all duration-300
        min-h-[120px] sm:min-h-[140px]
        ${className}
      `}
    >
      {/* Top Right Icon */}
      {Icon && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/10 backdrop-blur-md p-2 rounded-full">
          <Icon size={16} className="text-white sm:size-18" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-between h-full">
        {/* Title */}
        <p className="text-sm sm:text-base md:text-lg text-white font-medium">
          {title}
        </p>

        {/* Value */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
          {value}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className={`text-xs sm:text-sm mt-2 text-white`}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}
