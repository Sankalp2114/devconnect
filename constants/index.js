import {
  Home,
  Search,
  ScrollText,
  Users,
  User,
  MessageSquare,
  Pencil,
} from "lucide-react";

export const sidebarLinks = [
  {
    icon: <Home color="white" />,
    route: "/",
    label: "Home",
  },
  {
    icon: <Search color="white" />,
    route: "/search",
    label: "Search",
  },
  {
    icon: <ScrollText color="white" />,
    route: "/logs",
    label: "Logs",
  },
  {
    icon: <Pencil color="white" />,
    route: "/create-thread",
    label: "Create Thread",
  },
  {
    icon: <Users color="white" />,
    route: "/communities",
    label: "Communities",
  },
  {
    icon: <User color="white" />,
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: <MessageSquare color="white" /> },
  { value: "replies", label: "Replies", icon: <Users color="white" /> },
  { value: "tagged", label: "Tagged", icon: <User color="white" /> },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: <MessageSquare color="white" /> },
  { value: "members", label: "Members", icon: <Users color="white" /> },
  { value: "requests", label: "Requests", icon: <Pencil color="white" /> },
];
