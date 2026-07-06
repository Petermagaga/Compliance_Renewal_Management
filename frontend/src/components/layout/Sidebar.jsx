import {
  FiGrid,
  FiFileText,
  FiPlusSquare,
  FiFolder,
  FiUsers,
  FiBell,
  FiBarChart2,
  FiSettings
} from "react-icons/fi";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-brand-dark text-white flex flex-col fixed">
      
      {/* Logo */}
      <div className="p-6 border-b border-green-800">
        <h1 className="text-3xl font-bold text-brand-yellow">Unibrain</h1>
        <p className="text-sm text-white">Industries Ltd</p>
      </div>

      {/* Menu */}
      <div className="flex-1 py-6">
        <ul className="space-y-3 px-4">

          <li className="bg-brand-yellow text-black rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer">
            <FiGrid />
            Dashboard
          </li>

          <li className="px-4 py-3 flex items-center gap-3 hover:bg-green-800 rounded-lg cursor-pointer">
            <FiFileText />
            Compliance Items
          </li>

          <li className="px-4 py-3 flex items-center gap-3 hover:bg-green-800 rounded-lg cursor-pointer">
            <FiPlusSquare />
            Add Compliance Item
          </li>

          <li className="px-4 py-3 flex items-center gap-3 hover:bg-green-800 rounded-lg cursor-pointer">
            <FiFolder />
            Documents
          </li>

          <li className="px-4 py-3 flex items-center gap-3 hover:bg-green-800 rounded-lg cursor-pointer">
            <FiUsers />
            Departments
          </li>

          <li className="px-4 py-3 flex items-center gap-3 hover:bg-green-800 rounded-lg cursor-pointer">
            <FiBell />
            Reminders
          </li>

          <li className="px-4 py-3 flex items-center gap-3 hover:bg-green-800 rounded-lg cursor-pointer">
            <FiBarChart2 />
            Reports
          </li>

          <li className="px-4 py-3 flex items-center gap-3 hover:bg-green-800 rounded-lg cursor-pointer">
            <FiSettings />
            Settings
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-green-800">
        <div className="bg-green-800 rounded-xl p-4">
          <p className="font-semibold">Peter Magaga</p>
          <p className="text-sm text-gray-300">Administrator</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;