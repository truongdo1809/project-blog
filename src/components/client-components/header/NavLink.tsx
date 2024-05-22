import Link from "next/link";
import React from "react";

interface NavLinkProps {
    path: string;
    label: string;
    currentRoute: string;
    onClick?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({ path, label, currentRoute, onClick }) => (
  <Link href={path}>
    <li
      className={`px-6 py-3 hover:text-var[--primary-color] hover:opacity-100 ${
        currentRoute === path ? "opacity-100" : "opacity-60"
      }`}
      onClick={onClick}
    >
      {label}
    </li>
  </Link>
);

export default NavLink;
