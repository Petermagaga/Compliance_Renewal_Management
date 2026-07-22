import { navigationRegistry } from "../../app/navigation/navigationRegistry";
import SidebarItem from "./SidebarItem";

function Sidebar() {
    return (
        <aside
            className="
                w-64
                h-screen
                bg-brand-dark
                text-white
                flex
                flex-col
                fixed
                left-0
                top-0
                shadow-lg
            "
        >
            {/* Logo */}
            <div className="p-6 border-b border-green-800">
                <h1 className="text-3xl font-bold text-brand-yellow">
                    Unibrain
                </h1>

                <p className="text-sm text-gray-300">
                    Industries Ltd
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
                        Peter Magaga
                    </p>

                    <p className="text-sm text-gray-300">
                        Administrator
                    </p>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;