"use client";
import { ChevronDownIcon, PowerIcon, UserIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "~/app/lib/apiRequest";
import authSlice from "~/app/lib/features/authSlice";

export default function DropdownUser() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const {user}=useSelector(authSlice.selectSlice)
  const dispatch = useDispatch();
  const router = useRouter();
  const session = useSession();

  const handleLogout = async () => {
    try {
      if (session && session.status === "authenticated") {
        await signOut({ redirect: false });
      } else {
        logOut(dispatch, router);
      }
      window.localStorage.clear();
      console.log("Local storage cleared.");
      dispatch(authSlice.actions.clearAllData());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <div
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
      >
        {user ? (
          <span className="hidden text-right lg:block dark:text-white">
          <span className="block text-sm font-medium">{user.user.username}</span>
          <span className="block text-xs">{user.user.roles[0]}</span>
        </span>
        ) : null }

        <span className="h-11 w-11 rounded-full">
          <Image
            width={100}
            height={100}
            src={user && user.user.imgUrl || "https://i.imgur.com/xOZuiLD.png"}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="User avatar"
          />
        </span>

        <ChevronDownIcon className="w-4 h-3 dark:text-white" />
      </div>

        <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark z-99999">
          <li>
            <Link
              href="/admin/my-profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-[var(--primary-color)] lg:text-base"
            >
              <UserIcon className="w-5.5 h-5.5" />
              My Profile
            </Link>
          </li>
          <li>
            <button 
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-[var(--primary-color)] lg:text-base"
              onClick={handleLogout}
            >
              <PowerIcon className="w-5.5 h-5.5" />
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
