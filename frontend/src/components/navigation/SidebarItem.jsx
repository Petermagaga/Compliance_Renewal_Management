import { NavLink } from "react-router-dom";

function SidebarItem({

    title,

    path,

    icon: Icon,

}) {

    return (

        <NavLink

            to={path}

            className={({ isActive }) =>

                `flex items-center gap-3 px-4 py-3 rounded-lg transition

                ${isActive

                    ? "bg-brand-yellow text-black"

                    : "text-white hover:bg-green-800"

                }`

            }

        >

            <Icon size={18} />

            <span>

                {title}

            </span>

        </NavLink>

    );

}

export default SidebarItem;