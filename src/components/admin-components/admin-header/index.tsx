import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import DropdownMessage from "./DropdownMessage";
import DropdownUser from "./DropdownUser";
import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { useSelector } from "react-redux";
import authSlice from "~/app/lib/features/authSlice";

const { Search } = Input;
const onSearch: SearchProps["onSearch"] = (value, _e, info) => console.log(info?.source, value);

export default function AdminHeader(props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) {

  const { user } = useSelector(authSlice.selectSlice);

  return (
    <header className="sticky top-0 z-[999] flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center h-16 justify-between shadow-2 py-2 px-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-[99999] block rounded-sm border border-stroke bg-white p-[6px] shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-[22px] w-[22px] cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-[2px] w-0 rounded-sm bg-black delay-0 duration-200 ease-in-out dark:bg-white
                    ${
                      !props.sidebarOpen && "!w-full delay-300"
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-[2px] w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white
                  ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-[2px] w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white
                  ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-[10px] top-0 block h-full w-[2px] rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white
                  ${!props.sidebarOpen && "!h-0 !delay-0"}`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-[10px] block h-[2px] w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white
                  ${!props.sidebarOpen && "!h-0 !delay-200"}`}
                ></span>
              </span>
            </span>
          </button>

          <Link className="block flex-shrink-0 lg:hidden" href="/admin">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="tracking-wider font-semibold block text-black dark:text-white text-2xl xsm:font-medium xsm:text-xl mr-4 xsm:mr-0">
                  Admin
                </h1>
              </div>
            </div>
          </Link>
        </div>

        <div className="hidden md:block min-w-90 px-4 lg:pl-0 header-search">
          <Search
            placeholder="Type to search ..."
            allowClear
            onSearch={onSearch}
            style={{ width: 400 }}
            size="large"
          />
        </div>

        <div className="flex items-center gap-3 sm:gap-7">
          <ul className="flex items-center gap-2 sm:gap-4">
            <DarkModeSwitcher />
            <DropdownNotification />
            <DropdownMessage />
          </ul>
        
          <DropdownUser />
        </div>
      </div>
    </header>
  );
}
