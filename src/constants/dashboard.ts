import { Props } from "@/components/icons/types";
import { LayoutGrid, MessageSquare, Users, Calendar, Users2, Wrench } from "lucide-react";

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
    Icon: LayoutGrid,
  },
  {
    key: "admins",
    label: "Admins",
    href: "/admins",
    Icon: Users,
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
