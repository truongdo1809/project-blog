import React from "react";
import { PencilSquareIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

interface ButtonProps {
    onClick?: () => void;
    type: "view" | "edit" | "delete";
    className?: string;
    title?: string;
}

const ActionButton: React.FC<ButtonProps> = ({ onClick, type, className, title }) => {
    let buttonClass = "";
    let icon = null;

    switch (type) {
        case "view":
            buttonClass = "bg-meta-10";
            icon = <EyeIcon className="w-4 h-4" />;
            break;
        case "edit":
            buttonClass = "bg-[var(--primary-color)]";
            icon = <PencilSquareIcon className="w-4 h-4" />;
            break;
        case "delete":
            buttonClass = "bg-meta-1";
            icon = <TrashIcon className="w-4 h-4" />;
            break;
        default:
            break;
    }

    return (
        <button
            onClick={onClick}
            className={`text-white items-center p-1.5 rounded-md cursor-pointer opacity-100 hover:opacity-80 ${buttonClass} ${className}`}
            title={title}
        >
            {icon}
        </button>
    );
};

export default ActionButton;
