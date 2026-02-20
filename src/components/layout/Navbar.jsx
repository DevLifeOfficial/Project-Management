import React from "react";
import {
  Menu,
  Bell,
  Settings,
} from "lucide-react";

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center gap-4">

          {/* Mobile Collapse Button */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          >
            <Menu size={20} />
          </button>

          {/* Greeting */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 hidden sm:block">
              Welcome back
            </span>
            <span className="text-lg sm:text-xl font-semibold text-gray-800">
              John Doe 👋
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Today Task Progress (Hidden on very small screens) */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
            <span className="text-xs text-gray-600">
              Today: 4/7 tasks
            </span>
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-blue-500"></div>
            </div>
          </div>

          <button className="relative p-2 rounded-md hover:bg-gray-100 transition">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 transition">
            <Settings size={18} className="text-gray-600" />
          </button>

        </div>
      </div>
    </header>
  );
}