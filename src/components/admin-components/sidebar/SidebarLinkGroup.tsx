import React from "react";

interface SidebarLinkGroupProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const SidebarLinkGroup: React.FC<SidebarLinkGroupProps> = ({ isOpen, onToggle, children }: SidebarLinkGroupProps) => {
  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<any>, { isOpen, onToggle })
      )}
    </>
  );
};

export default SidebarLinkGroup;
