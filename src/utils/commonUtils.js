import { FaBlog } from "react-icons/fa";
import { ChatBubbleLeftEllipsisIcon, ChatBubbleLeftRightIcon, InboxStackIcon, MusicalNoteIcon, PowerIcon, UserIcon, UsersIcon } from "@heroicons/react/24/outline";

export const REGEX = {
    emailOrPhone:
      /^(?:[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+|0[1-9][0-9]{8})$/,
    phone: /^(?:\+84|0)[1-9][0-9]{7,8}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
  };
  
  export const formatCurrency = (amount) => {
    if (isNaN(amount) || amount === undefined) {
      return amount;
    }
    return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  };
  
  export const formatDate = (date) => {
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  
  export const API_URLS = {
    CREATEPOST: "https://news-api.toolhub.asia/posts/create",
    GETPOSTS: "https://news-api.toolhub.asia/posts/get-posts",
    GETPOSTBYID: "https://news-api.toolhub.asia/posts/",
    DELETEPOST: "https://news-api.toolhub.asia/posts/delete/",
    UPDATEPOST: "https://news-api.toolhub.asia/posts/update/",
    CATEGORIES: "https://news-api.toolhub.asia/category",
    UPLOADFILE: "https://news-api.toolhub.asia/file/upload"
  };
  
  export const StatusOptions = [
    { value: "draft", label: "Draft" },
    { value: "pending", label: "Pending" },
    { value: "published", label: "Published" },
    { value: "trash", label: "Trash" },
  ];
  
  export const PerPageOptions = [
    { value: "10", label: "10 / page" },
    { value: "20", label: "20 / page" },
    { value: "30", label: "30 / page" },
    { value: "50", label: "50 / page" },
    { value: "100", label: "100 / page" },
  ];
  
  export const columnTitles = {
    id: "Id",
    name: "Name",
    image: "Thumbnail",
    category: "Category",
    created: "Created",
    views: "Views",
    comment: "Comment",
    share: "Share",
    rate: "Rate",
    status: "Status",
    actions: "Actions",
  };

  export const menuItems = [
    { href: "/admin", label: "Dashboard", icon: InboxStackIcon },
    { href: "/admin/media", label: "Media", icon: MusicalNoteIcon },
    {
      href: "/admin/blogs",
      label: "Blogs",
      icon: FaBlog,
      subMenu: [
        { href: "/admin/blogs/all-blogs", label: "All Blogs" },
        { href: "/admin/blogs/blog-editor", label: "Blog-editor" },
        { href: "/admin/blogs/categories", label: "Categories" },
      ],
    },
    {
      href: "/admin/message",
      label: "Message",
      icon: ChatBubbleLeftEllipsisIcon,
    },
    { 
      href: "/admin/users", 
      label: "Users", 
      icon: UsersIcon,
      subMenu: [
        { href: "/admin/users/all-users", label: "All Users" },
        { href: "/admin/users/role-manager", label: "Role manager" },
      ]
    },
    { href: "/admin/my-profile", label: "My profile", icon: UserIcon },
    { href: "/admin/review", label: "Review", icon: ChatBubbleLeftRightIcon },
    { href: "/admin/log-out", label: "Log out", icon: PowerIcon },
  ];