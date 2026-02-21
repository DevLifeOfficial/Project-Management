import React, { useEffect, useRef } from "react";

export default function Form({
  fields,
  formData,
  onChange,
  onSubmit,
  isOpen,
  mode,
  error,
}) {
  const focusRef = useRef(null);

  useEffect(() => {
    if (isOpen && focusRef.current) {
      focusRef.current.focus();
    }
  }, [isOpen]);

  return (
    <form
      onSubmit={onSubmit}
      className={`p-4 rounded-xl transition-all duration-300 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="grid md:grid-cols-2 gap-4">
        {fields
          .filter((field) => field.mode === mode || field.mode === "both")
          .map((field, idx) => (
            <div key={field.name}>
              <label className="text-sm text-white font-medium">
                {field.label}
              </label>

              {field.type === "select" ? (
                <select
                  ref={idx === 0 ? focusRef : null}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={onChange}
                  className="w-full mt-1 bg-zinc-800 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  ref={idx === 0 ? focusRef : null}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={onChange}
                  className="w-full mt-1 bg-zinc-800 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              )}

              {error?.[field.name] && (
                <p className="text-red-500 text-xs mt-1">{error[field.name]}</p>
              )}
            </div>
          ))}
      </div>

      <button className="mt-4 bg-cyan-500 px-4 py-2 rounded font-medium text-sm text-white hover:bg-cyan-600 transition-colors duration-300">
        {mode === "edit" ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
}
