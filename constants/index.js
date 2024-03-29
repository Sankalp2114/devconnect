import {
  Home,
  Search,
  ScrollText,
  Users,
  User,
  MessageSquare,
  Pencil,
  Heart,
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
    route: `/profile`,
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: <MessageSquare color="grey" /> },
  { value: "replies", label: "Replies", icon: <Users color="grey" /> },
  { value: "liked", label: "Liked Threads", icon: <Heart color="grey" /> },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: <MessageSquare color="grey" /> },
  { value: "members", label: "Members", icon: <Users color="grey" /> },
  { value: "requests", label: "Requests", icon: <Pencil color="grey" /> },
];
