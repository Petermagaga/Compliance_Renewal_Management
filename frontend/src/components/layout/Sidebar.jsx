import { NavLink } from "react-router-dom";
import navigation from "../../routes/navigation";

function Sidebar() {

    return (

        <aside className="w-64 bg-white border-r h-screen flex flex-col">

            <div className="p-6 border-b">

                <h1 className="text-2xl font-bold text-brand-green">

                    OpenComply

                </h1>

            </div>

            <nav className="flex-1 p-4 space-y-2">

                {navigation.map(item => {

                    const Icon = item.icon;

                    return (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({ isActive }) =>

                                `flex items-center gap-3 px-4 py-3 rounded-lg transition

                                ${isActive

                                    ? "bg-brand-green text-white"

                                    : "text-gray-700 hover:bg-gray-100"

                                }`

                            }

                        >

                            <Icon size={20} />

                            <span>

                                {item.title}

                            </span>

                        </NavLink>

                    );

                })}

            </nav>

        </aside>

    );

}

export default Sidebar;