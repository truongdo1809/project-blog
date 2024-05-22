export type MENUITEM = {
  href: string;
  label: string;
  icon?: React.ElementType;
  subMenu?: MENUITEM[];
};
