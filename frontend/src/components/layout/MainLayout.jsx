import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 flex-1 min-h-screen">
        <Topbar />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;