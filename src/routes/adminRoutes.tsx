import Profile from "@/components/dashboardComponents/Profile";
import AdminDashboard from "@/pages/dashboards/admin/dashboard/AdminDashboard";
import AllParcels from "@/pages/dashboards/admin/parcelManagement/AllParcels";
import UserManagement from "@/pages/dashboards/admin/userManagement/UserManagement";
import type { ISidebarItem } from "@/types";
import { 
  BarChart3, 
  Package, 
  Users, 
  User
} from "lucide-react";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/dashboard",
        component: AdminDashboard,
        icon: BarChart3,
      }
    ],
  },
  {
    title: "Parcel Management",
    items: [
      {
        title: "All Parcels",
        url: "/admin/parcels",
        component: AllParcels,
        icon: Package,
      }
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        url: "/admin/users",
        component: UserManagement,
        icon: Users,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/admin/profile",
        component: Profile,
        icon: User,
      },
    ],
  },
];