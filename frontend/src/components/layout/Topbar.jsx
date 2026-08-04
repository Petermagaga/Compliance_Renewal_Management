import { FiMenu, FiBell } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";  

import NotificationBell from "../../features/notifications/components/NotificationToolbar";

function Topbar() {
  const { user } = useAuth();

  const today = new Date();

  const formattedDate = today.toLocaleDateString(
      "en-GB",
      {
          day: "2-digit",
          month: "long",
          year: "numeric",
      }
  );

  const currentMonth = today.toLocaleDateString(
      "en-GB",
      {
          month: "long",
          year: "numeric",
      }
  );

  const hour = today.getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
      greeting = "Good Morning";
  } else if (hour < 18) {
      greeting = "Good Afternoon";
  }


  return (
    <div className="bg-white h-24 shadow-sm px-8 flex items-center justify-between">
      
      <div className="flex items-center gap-6">
        <FiMenu size={24} />

      <h1 className="text-2xl">
          {greeting},{" "}
          <span className="font-bold">
              {user?.full_name} 👋
          </span>
      </h1>

      </div>

      <div className="flex items-center gap-4">
          
          <NotificationBell />

      <div className="border rounded-lg px-4 py-2">
          {formattedDate}
      </div>

      <div className="border rounded-lg px-4 py-2">
          {currentMonth}
      </div>


      </div>
    </div>
  );
}

export default Topbar;