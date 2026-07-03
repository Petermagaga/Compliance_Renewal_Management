import { FiMenu, FiBell } from "react-icons/fi";

function Topbar() {
  return (
    <div className="bg-white h-24 shadow-sm px-8 flex items-center justify-between">
      
      <div className="flex items-center gap-6">
        <FiMenu size={24} />
        <h1 className="text-2xl">
          Welcome back, <span className="font-bold">Peter Magaga 👋</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <FiBell size={20} />

        <div className="border rounded-lg px-4 py-2">
          03 July 2026
        </div>

        <div className="border rounded-lg px-4 py-2">
          This Month
        </div>
      </div>
    </div>
  );
}

export default Topbar;