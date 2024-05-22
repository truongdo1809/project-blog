import {
  PowerIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import NavLink from "./NavLink";
import Link from "next/link";

interface MobileMenuProps {
  navLinks: { path: string; label: string }[];
  isOpen: boolean;
  toggleNavbar: () => void;
  currentRoute: string;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  navLinks,
  isOpen,
  toggleNavbar,
  currentRoute,
  isLoggedIn,
  onLogout,
}) => (
  <ul
    id="mobile-menu"
    className="absolute top-full inset-x-0 bg-indigo-950 border-t border-solid border-gray-300 w-full z-40 overflow-hidden transition-height duration-300 ease-in-out"
    style={{ maxHeight: isOpen ? "900px" : 0 }}
  >
    {navLinks.map(({ path, label }) => (
      <NavLink
        key={path}
        path={path}
        label={label}
        currentRoute={currentRoute}
        onClick={toggleNavbar}
      />
    ))}
    {isLoggedIn ? (
      <div className="border-t border-stroke py-2">
        <Link href="/profile">
          <li
            className="flex items-center px-6 py-3 hover:text-var[--primary-color] opacity-60 hover:opacity-100"
            onClick={() => toggleNavbar()}
          >
            <UserIcon className="w-5 h-5 mr-2" /> My profile
          </li>
        </Link>
        <li
          className="flex items-center px-6 py-3 hover:text-var[--primary-color] opacity-60 hover:opacity-100"
          onClick={() => {
            onLogout();
            toggleNavbar();
          }}
        >
          <PowerIcon className="w-5 h-5 mr-2" /> Log out
        </li>
      </div>
    ) : (
      <div className="border-t border-stroke py-2">
        <Link href={"/login"}>
          <li
            className="flex items-center px-6 py-3 hover:text-var[--primary-color] opacity-60 hover:opacity-100"
            onClick={() => toggleNavbar()}
          >
            <UserCircleIcon className="text-white w-5 mr-2" /> Login
          </li>
        </Link>
      </div>
    )}
  </ul>
);

export default MobileMenu;
