import { navigationRegistry } from "../../app/navigation/navigationRegistry";
import SidebarItem from "../navigation/SidebarItem";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Sidebar({open,onClose}) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <>

        {open && (
            <div
                className="
                    fixed
                    inset-0
                    z-40
                    bg-slate-900/50
                    lg:hidden
                "
                onClick={onClose}
            />
        )}
        <aside
            className={`
                fixed
                left-0
                top-0
                z-50
                flex
                h-screen
                w-64
                flex-col
                bg-brand-dark
                text-white
                shadow-lg
                transition-transform
                duration-300

                lg:translate-x-0

                ${
                    open
                        ? "translate-x-0"
                        : "-translate-x-full"
                }
            `}
        >
            {/* Logo */}
            <div className="p-6 border-b border-green-800">
                <h1 className="text-3xl font-bold text-brand-yellow">
                    {user?.company || "OpenComply"}
                </h1>

                <p className="text-sm text-gray-300">
                    Compliance Management System
                </p>
            </div>

            {/* Navigation */}
            <nav
                className="
                    flex-1
                    overflow-y-auto
                    py-6
                "
            >
                <ul className="space-y-2 px-4">
                    {navigationRegistry.map((item) => (
                        <li key={item.id}>
                            <SidebarItem {...item} />
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-green-800">
                <div
                    className="
                        bg-green-800
                        rounded-xl
                        p-4
                    "
                >
                <p className="font-semibold">
                    {user?.full_name}
                </p>

                <p className="text-sm text-gray-300">
                    {user?.role}
                </p>

                <button
                    onClick={handleLogout}
                    className="mt-4 w-full rounded-lg bg-red-600 py-2 text-sm hover:bg-red-700"
                >
                    Logout
                </button>

                </div>
            </div>
        </aside>
    
        </>
    );
}

export default Sidebar;