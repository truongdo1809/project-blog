import React from "react";
import { PlusIcon, ArrowUturnRightIcon, XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";

interface ButtonProps {
    onClick?: () => void;
    content: string;
    type: "add" | "apply" | "cancel" | "submit" | "view" | "info";
    className?: string;
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, content, type, className }) => {
    let buttonClass = "";
    let icon = null;

    switch (type) {
        case "add":
            buttonClass = "bg-[var(--primary-color)]";
            icon = <PlusIcon className="w-5 h-5 mr-2" />;
            break;
        case "apply":
            buttonClass = "bg-[var(--primary-color)]";
            icon = <ArrowUturnRightIcon className="w-5 h-5 mr-2" />;
            break;
        case "cancel":
            buttonClass = "bg-meta-1";
            icon = <XMarkIcon className="w-5 h-5 mr-2" />;
            break;
        case "submit":
            buttonClass = "bg-[var(--primary-color)]";
            break;
        case "view":
            buttonClass = "bg-meta-10";
            icon = <EyeIcon className="w-5 h-5 mr-2" />;
            break;
        case "info":
            buttonClass = "bg-meta-10";
            break;
        default:
            break;
    }

    return (
        <button
            onClick={onClick}
            className={`flex justify-between text-white h-9 items-center px-4 rounded-md cursor-pointer opacity-100 hover:opacity-80 ${buttonClass} ${className}`}
        >
            {icon}
            {content}
        </button>
    );
};

export default CustomButton;
