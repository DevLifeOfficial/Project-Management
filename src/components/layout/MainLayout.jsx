import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="bg-gray-100 flex-1 flex flex-col md:ml-20 w-full">
        <Navbar onToggleSidebar={() => setIsOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden"
         style={{
          backgroundImage: "url('sofia.jpg')",
          backgroundPosition: "center",
          backgroundSize:"100% 100%"
         }}>
          {children}
        </main>
      </div>
    </div>
  );
}
