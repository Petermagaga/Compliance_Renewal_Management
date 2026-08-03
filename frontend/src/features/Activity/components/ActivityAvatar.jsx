function getInitials(name = "") {

    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

}

function ActivityAvatar({

    user,

}) {

    return (

        <div
            className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-slate-200
                font-semibold
                text-slate-700
            "
        >
            {getInitials(user)}

        </div>

    );

}

export default ActivityAvatar;