
export const getDotClass = (status: string) => {
    switch (status?.toLowerCase()) {
        case "active":
        case "running":
            return "bg-emerald-500 shadow-[0_0_6px_theme(colors.emerald.400)]";
        case "pending":
        case "creating":
            return "bg-amber-400 animate-pulse";
        case "stopped":
        case "terminated":
            return "bg-zinc-300";
        default:
            return "bg-red-400";
    }
};

export const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
        case "active":
        case "running":
            return "bg-emerald-50 text-emerald-700 border-emerald-200";
        case "pending":
        case "creating":
            return "bg-amber-50 text-amber-700 border-amber-200";
        case "stopped":
        case "terminated":
            return "bg-zinc-100 text-zinc-400 border-zinc-200";
        default:
            return "bg-red-50 text-red-600 border-red-200";
    }
};