import { NavLink } from "react-router-dom";

function SidebarItem({

    title,

    path,

    icon: Icon,
    badge,

}) {

    return (

        <NavLink

            to={path}
            aria-label={title}

            className={({ isActive }) =>

                `    flex items-center
                     gap-3
                     px-4
                     py-3
                     rounded-xl
                     transition-all
                     duration-200
                     font-medium

                ${isActive

                    ? "bg-brand-yellow text-black shadow"

                    : "text-white hover:bg-green-800"

                }`

            }

        >

            <Icon size={18} 
            className="flex-shrink-0"
            />

            <span>

                {title}

            </span>

            {badge && (
                <span className="ml-auto ...">
                    {badge}
                </span>
            
            )}

        </NavLink>

    );

}

export default SidebarItem;