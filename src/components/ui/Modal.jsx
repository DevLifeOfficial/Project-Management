import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children, size }) {
  useEffect(() => {
    
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div
        className={`relative bg-zinc-900 p-4 rounded-2xl w-full ${size} 
                      transform transition-all duration-300 scale-100`}
      >
        {children}
      </div>
    </div>
  );
}
