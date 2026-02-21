import React from "react";

export default function StatusBadges({ status }) {
  if (!status) return null;

  const normalized = status.toLowerCase().replace(" ", "-");

const statusStyles = {
  todo: "bg-blue-100 text-blue-700",
  "in-progress": "bg-yellow-100 text-yellow-700",
  "in-review": "bg-purple-100 text-purple-700",
  done: "bg-green-100 text-green-700",
  completed: "bg-green-100 text-green-700",
  ongoing: "bg-indigo-100 text-indigo-700",
  overdue: "bg-red-100 text-red-700",
};
  const style =
    statusStyles[normalized] || "bg-gray-100 text-gray-600";

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${style}`}
    >
      {status}
    </span>
  );
}