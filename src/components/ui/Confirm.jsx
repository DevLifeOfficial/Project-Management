import React from "react";

export default function Confirm({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) {
  if (!isOpen) return null;

  return (
      <div className="relative bg-zinc-900 p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-2">
          {title}
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          {message}
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
    </div>
  );
}
