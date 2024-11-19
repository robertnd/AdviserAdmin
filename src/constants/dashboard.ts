import { Props } from "@/components/icons/types";


import { CircleUser, FolderKanban, LayoutDashboard, UsersRound,  Calendar } from "lucide-react";


  export const SIDEBAR_MENU_ITEMS: {
  key: string;
  label: string;
  href: string;
  Icon: React.FC<Props>;
}[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    Icon: LayoutDashboard,
  },
  {
    key: "intermediaries",
    label: "Advisers",
    href: "/intermediaries",
    Icon: UsersRound,
  },
  {
    key: "users",
    label: "Users",
    href: "/users",
    Icon: CircleUser,
  },
  // {
  //   key: "departments",
  //   label: "Departments",
  //   href: "/departments",
  //   Icon: Grid3X3,
  // },
  {
    key: "products",
    label: "Products",
    href: "/product-categories",
    Icon: FolderKanban,

  },
  // {
  //   key: "branches",
  //   label: "Branches",
  //   href: "/branches",

  //   Icon: Landmark,

  // },
  // {
  //   key: "notifications",
  //   label: "Notifications",
  //   href: "/notifications",
  //   Icon: Bell,
  // },
  {
    key: "events",
    label: "Events",
    href: "/events",
    Icon: Calendar,
  },
  // {
  //   key: "workbench",
  //   label: "Workbench",
  //   href: "/workbench",
  //   Icon: LayoutGrid,
  // },
  // {
  //   key: "leads",
  //   label: "Leads",
  //   href: "/leads",
  //   Icon: MessageSquare,
  // },
  // {
  //   key: "customer",
  //   label: "Customer",
  //   href: "/customer",
  //   Icon: Users,
  // },
  // {
  //   key: "campaign",
  //   label: "Campaign",
  //   href: "/campaign",
  //   Icon: Calendar,
  // },
  // {
  //   key: "myTeam",
  //   label: "My Team",
  //   href: "/my-team",
  //   Icon: Users2,
  // },
  // {
  //   key: "servicing",
  //   label: "Servicing",
  //   href: "/servicing",
  //   Icon: Wrench,
  // },
];
