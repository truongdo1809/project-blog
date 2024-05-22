"use client"
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function DropdownMessage() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifying, setNotifying] = useState(true);

    const trigger = useRef<any>(null);
    const dropdown = useRef<any>(null);

    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!dropdown.current) return;
            if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;

            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <li className="relative">
            <Link
                ref={trigger}
                onClick={() => {
                    setNotifying(false);
                    setDropdownOpen(!dropdownOpen);
                }}
                className="relative flex h-[2.125rem] w-[2.125rem] items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-var[(--primary-color)] dark:border-strokedark dark:bg-meta-4 dark:text-white"
                href="#"
            >
                <span className={`absolute -right-[0.15rem] -top-[0.15em] z-1 h-2 w-2 rounded-full bg-meta-1 ${notifying === false ? "hidden" : "inline"}`}>
                    <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
                </span>
                <ChatBubbleOvalLeftEllipsisIcon className="w-[18px] h-[18px]" />
            </Link>

            {/* Dropdown Start */}
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute -right-16 mt-[0.625rem] flex h-[22.5rem] w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:boder-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${dropdownOpen === true ? "block" : "hidden"}`}
            >
                <div className="px-4.5 py-3">
                    <h5 className="text-sm font-medium text-bodydark2">Messages</h5>
                </div>

                <ul className="flex h-auto flex-col overflow-y-auto">
                    <li>
                        <Link
                            href="/admin/messages"
                            className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                        >
                            <div className="h-12.5 w-12.5 rounded-full">
                                <Image
                                    width={112}
                                    height={112}
                                    src="https://i.imgur.com/HJL8vfD.png"
                                    alt="User"
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                    }}
                                />
                            </div>

                            <div>
                                <h6 className="text-sm font-medium text-black dark:text-white">
                                    Mariya Desoja
                                </h6>
                                <p className="text-sm">I like your confidence 💪</p>
                                <p className="text-xs">2 min ago</p>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/messages"
                            className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                        >
                            <div className="h-12.5 w-12.5 rounded-full">
                                <Image
                                    width={112}
                                    height={112}
                                    src="https://i.imgur.com/vtoImuO.png"
                                    alt="User"
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                    }}
                                />
                            </div>

                            <div>
                                <h6 className="text-sm font-medium text-black dark:text-white">
                                    Robert Jhon
                                </h6>
                                <p className="text-sm">Can you share your offer?</p>
                                <p className="text-xs">10 min ago</p>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/messages"
                            className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                        >
                            <div className="h-12.5 w-12.5 rounded-full">
                                <Image
                                    width={112}
                                    height={112}
                                    src="https://i.imgur.com/zTFRtdv.png"
                                    alt="User"
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                    }}
                                />
                            </div>

                            <div>
                                <h6 className="text-sm font-medium text-black dark:text-white">
                                    Henry Dholi
                                </h6>
                                <p className="text-sm">I cam across your profile and ...</p>
                                <p className="text-xs">1 day ago</p>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/messages"
                            className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                        >
                            <div className="h-12.5 w-12.5 rounded-full">
                                <Image
                                    width={112}
                                    height={112}
                                    src="https://i.imgur.com/fqlvqxQ.png"
                                    alt="User"
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                    }}
                                />
                            </div>

                            <div>
                                <h6 className="text-sm font-medium text-black dark:text-white">
                                    Cody Fisher
                                </h6>
                                <p className="text-sm">I’m waiting for you response!</p>
                                <p className="text-xs">5 day ago</p>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/admin/messages"
                            className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                        >
                            <div className="h-12.5 w-12.5 rounded-full">
                                <Image
                                    width={112}
                                    height={112}
                                    src="https://i.imgur.com/HJL8vfD.png"
                                    alt="User"
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                    }}
                                />
                            </div>

                            <div>
                                <h6 className="text-sm font-medium text-black dark:text-white">
                                    Mariya Desoja
                                </h6>
                                <p className="text-sm">I like your confidence 💪</p>
                                <p className="text-xs">2 min ago</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </li>
    );
};
