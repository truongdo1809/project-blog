"use client";
import { ImExit } from "react-icons/im";
import {
  Bars3Icon,
  UserCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import styles from "./Header.module.css";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "~/app/lib/apiRequest";
import { useRouter } from "next/navigation";
import { IoSettingsSharp } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import authSlice from "~/app/lib/features/authSlice";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import { RootState } from "~/app/lib/store";
import { toast } from "react-toastify";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services" },
  { path: "/blog-list", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const session = useSession();
  const pathname = usePathname();
  const handleLogout = async () => {
    try {
      if (session && session.status === "authenticated") {
        await signOut({ redirect: false });
        dispatch(authSlice.actions.clearAllData());
        window.localStorage.clear();
        toast.success("logout successfully");
        router.push("/login")
      } else {
        logOut(dispatch, router);
      }
      window.localStorage.clear();

      dispatch(authSlice.actions.clearAllData());
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    if (isOpen) {
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu) {
        setMenuHeight(mobileMenu.scrollHeight);
      }
    } else {
      setMenuHeight(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  const toggleNavbar = () => setIsOpen(!isOpen);

  const currentRoute = pathname;
  const isLoggedIn =
    ((user || session) && user) || session.status === "authenticated"
      ? true
      : false;

  return (
    <div
      className={`sticky h-28 top-0 w-full py-4 text-white bg-indigo-950 opacity-90 z-[1000] `}
      style={{ top: visible ? "0" : "-200px" }}
    >
      <div className="max-w-[1140px] h-full mx-auto px-4 flex items-center justify-between">
        <div onClick={() => router.push("/")}>
          <Logo />
        </div>
        <ul className="hidden lg:inline-flex items-center uppercase text-sm">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              path={path}
              label={label}
              currentRoute={currentRoute}
            />
          ))}
        </ul>
        <div className="hidden lg:block">
          {((user || session) && user) || session.status === "authenticated" ? (
            <div
              className={`${styles["user-info"]} flex  items-center relative rounded-md cursor-pointer`}
            >
              <div className=" w-[40px] h-[40px] mr-2">
                <Image
                  width={100}
                  height={100}
                  src={user?.user?.imgUrl! || "/pic-1.jpg"}
                  alt=""
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
              {user && <p>{user?.user?.username}</p>}
              {session &&
                session.status === "authenticated" &&
                session.data?.user?.name && <p>{session.data?.user?.name}</p>}
              <div
                className={`${styles["user-option"]} w-[150px] absolute bg-white  text-black `}
              >
                <div
                  className=" px-3  flex  items-center py-3 hover:bg-slate-300 cursor-pointer"
                  onClick={handleLogout}
                >
                  <p className=" mr-2">
                    <ImExit />
                  </p>
                  <p>Log Out</p>
                </div>
                <Link href={"/profile"}>
                  <div className=" flex items-center px-3 py-3 hover:bg-slate-300 cursor-pointer">
                    <p className=" mr-2">
                      <IoSettingsSharp />
                    </p>
                    <p>Setting</p>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <Link href={"/login"}>
              <button
                className={`hidden lg:inline-flex gap-2 items-center py-2 px-12 rounded border border-solid border-white hover:bg-[var(--primary-color)]`}
              >
                <UserCircleIcon className="text-white w-6" />{" "}
                <span className="uppercase">Login</span>
              </button>
            </Link>
          )}
        </div>
        <div className="inline-flex lg:hidden" onClick={toggleNavbar}>
          {isOpen ? (
            <XCircleIcon className="text-white w-8" />
          ) : (
            <Bars3Icon className="text-white w-8" />
          )}
        </div>

        <MobileMenu
          navLinks={navLinks}
          isOpen={isOpen}
          toggleNavbar={toggleNavbar}
          currentRoute={currentRoute}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default Header;
