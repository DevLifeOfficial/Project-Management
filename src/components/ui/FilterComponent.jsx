import React from "react";

export default function FilterComponent({ controls, activeControl }) {
  return (
    <div className="flex flex-row items-center justify-end gap-4 mb-4">
      {controls.map((control) => {
        const Icon = control.icon;

        switch (control.type) {
          case "input":
            return (
              <div key={control.name} className="flex items-center space-x-2">
                {control.showIcon && (
                  <button
                    onClick={control.onToggle}
                    className="p-2 rounded-md hover:bg-gray-200 transition"
                  >
                    {Icon && <Icon size={18} />}
                  </button>
                )}

                {activeControl === control.name && (
                  <input
                    type="text"
                    placeholder={control.placeholder}
                    value={control.value}
                    onChange={control.onChange}
                    className="border rounded-md px-3 py-2 w-25 sm:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black transition-all duration-300"
                  />
                )}
              </div>
            );

          case "select":
            return (
              <div key={control.name} className="flex items-center space-x-2">
                {control.showIcon && (
                  <button
                    onClick={control.onToggle}
                    className="p-2 rounded-md hover:bg-gray-200 transition"
                  >
                    {Icon && <Icon size={18} />}
                  </button>
                )}

                {activeControl === control.name && (
                  <select
                    value={control.value}
                    onChange={control.onChange}
                    className="border rounded-md px-3 py-2 text-sm focus:outline-none text-black font-medium focus:ring-2 focus:ring-blue-400"
                  >
                    {control.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            );

          case "button":
            return (
              <button
                key={control.name}
                onClick={control.onClick}
                className="bg-blue-500 rounded-md px-3 py-2 flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                {Icon && <Icon size={16} className="text-white" />}
              </button>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
