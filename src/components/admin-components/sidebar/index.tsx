"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, ChevronUpIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { menuItems } from "~/utils/commonUtils";
import CustomButton from "~/components/common/button/CustomBtn";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  contentSidebarOpen: boolean;
  setContentSidebarOpen: (arg: boolean) => void;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  contentSidebarOpen,
  setContentSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const trigger = useRef<any>(null);
  const collapsed = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen, setSidebarOpen]);


  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

 
  const addNewHandler = () => {
    router.push("/admin/blogs/blog-editor")
  };
  
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 flex flex-col h-screen duration-300 ease-linear bg-black dark:bg-boxdark lg:static lg:translate-x-0 z-9999 ${
        contentSidebarOpen ? "lg:w-[218px]" : "lg:w-[96px]"
      }  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Sidebar header */}
      <div className="px-2">
        <div
          className={`relative py-2 border-b border-solid h-16 border-[#AEB7C0] ${
            contentSidebarOpen ? "pl-4 pr-12" : "px-4"
          }`}
        >
          <Link href="/admin">
            <div className="flex items-center justify-center">
              <Image
                width={100}
                height={100}
                className={`border border-solid bg-white block w-12 h-12 rounded-full ${
                  contentSidebarOpen ? "mr-3" : ""
                }`}
                src="https://i.imgur.com/Z7R1oAm.png"
                alt="Logo"
              />
              <div className={`${!contentSidebarOpen ? "lg:hidden" : ""}`}>
                <h1 className="tracking-wider font-semibold text-2xl text-white">
                  Admin
                </h1>
              </div>
            </div>
          </Link>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden absolute top-2 right-1"
          >
            <XCircleIcon className="w-6 h-6 text-[#AEB7C0] hover:text-white" />
          </button>

          <button
            ref={collapsed}
            onClick={() => setContentSidebarOpen(!contentSidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={contentSidebarOpen}
            className={`hidden lg:block absolute top-6 -right-4.5 border border-[#AEB7C0] rounded-full bg-black dark:bg-boxdark p-0.5 z-[1000000000] ${
              contentSidebarOpen ? "-right-1" : ""
            }`}
          >
            {!contentSidebarOpen ? (
              <ArrowRightIcon className="w-3 h-3 text-[#AEB7C0] hover:text-white" />
            ) : (
              <ArrowLeftIcon className="w-3 h-3 text-[#AEB7C0] hover:text-white" />
            )}
          </button>
        </div>
      </div>
      {/* End sidebar header */}

      {/* Sidebar nav */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear text-white relative">
        <ul
          className={`mt-3 px-4 py-4 lg:${!contentSidebarOpen ? "" : "px-6"}`}
        >
          {menuItems.map((item, index) => (
            <SidebarLinkGroup
              key={index}
              isOpen={openSubmenu === index}
              onToggle={() => handleSubmenuToggle(index)}
            >
              <React.Fragment>
                <Link
                  href={!item.subMenu ? item.href : "#"}
                  className={`flex px-4 py-2 rounded-md my-1 hover:bg-graydark dark:hover:bg-meta-4 items-center ${
                    contentSidebarOpen ? "" : "lg:justify-center"
                  } ${
                    (pathname === item.href ||
                      (item.subMenu &&
                        item.subMenu.some(
                          (subItem) => pathname === subItem.href
                        ))) &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                  onClick={() => handleSubmenuToggle(index)}
                >
                  <item.icon
                    className={`w-6 h-6 mr-4 ${
                      contentSidebarOpen ? "" : "lg:w-7 lg:h-7 lg:mr-0"
                    }`}
                  />
                  <span
                    className={`inline-block ${
                      !contentSidebarOpen ? "lg:hidden" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.subMenu &&
                    contentSidebarOpen &&
                    (openSubmenu === index ? (
                      <ChevronUpIcon className="w-4 h-4 mr-0 ml-auto" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4 mr-0 ml-auto" />
                    ))}
                </Link>

                {item.subMenu &&
                  contentSidebarOpen && (
                    <div className="translate transform overflow-hidden duration-300 ease-linear">
                      <ul className={`${openSubmenu === index ? "h-full" : "h-0 hidden"}`}>
                        {item.subMenu.map((subItem, subIndex) => (
                          <Link href={subItem.href} key={subIndex}>
                            <li
                              className={`text-bodydark2 px-4 py-1 rounded-md pl-14 hover:text-white ${
                                pathname === subItem.href && "text-white"
                              }`}
                            >
                              <span>{subItem.label}</span>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  )}
              </React.Fragment>
            </SidebarLinkGroup>
          ))}
        </ul>
      </div>
      {/* End sidebar nav */}

      {/* Sidebar add new post button */}
      {!pathname.includes("/admin/blogs") && (
        <div
          className={`flex justify-center items-center mt-auto mb-5 ${
            !contentSidebarOpen ? "lg:hidden" : ""
          }`}
        >
          <CustomButton onClick={addNewHandler} content="New post" type="add" />
        </div>
      )}
      {/* End sidebar add new post button */}
    </aside>
  );
}
