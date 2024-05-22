import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import useColorMode from "~/hooks/UseColorMode";

export default function DarkModeSwitcher () {
    const [colorMode, setColorMode] = useColorMode();

    return (
        <li className="flex justify-center">
            <label 
                className={`relative m-0 block h-[30px] w-14 rounded-full ${colorMode === "dark" ? "bg-[var(--primary-color)]" : "bg-stroke"}`}
            >
            <input 
                type="checkbox" 
                onChange={() => {
                    if (typeof setColorMode === "function") {
                        setColorMode(colorMode === "light" ? "dark" : "light");
                    }
                }}
                className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
            />
            <span 
                className={`absolute left-[3px] top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear
                ${colorMode === "dark" && "!right-[3px] !translate-x-full"}`}
            >
                <span className="dark:hidden">
                    <SunIcon className="h-4 w-4 rounded-full" />
                </span>
                <span className="hidden dark:inline-block">
                    <MoonIcon className="h-4 w-4 rounded-full" />
                </span>
            </span>
            </label>
        </li>
    )
}