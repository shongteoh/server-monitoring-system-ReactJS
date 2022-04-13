import {List, BarChart, Description, LineStyle,Timeline, Notifications } from "@material-ui/icons";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <LineStyle />,
    cName: "nav-text",
  },

  {
    title: "Performances",
    path: "/performances",
    icon: <BarChart />,
    cName: "nav-text",
  },
  {
    title: "Process",
    path: "/process",
    icon: <Description />,
    cName: "nav-text",
  },
  {
    title: "Analytics for Processes",
    path: "/Analytic",
    icon: <Timeline />,
    cName: "nav-text",
  },

  {
    title: "Manage Server",
    path: "/server",
    icon: <List />,
    cName: "nav-text",
  },
  {
    title: "Notification",
    path: "/notification",
    icon: <Notifications />,
    cName: "nav-text",
  },
];