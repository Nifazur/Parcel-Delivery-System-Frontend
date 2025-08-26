import AdminDashboard from "@/pages/dashboards/admin/dashboard/AdminDashboard";
import Analytics from "@/pages/dashboards/admin/dashboard/Analytics";
import ParcelStatistics from "@/pages/dashboards/admin/dashboard/ParcelStatistics";
import AddDivision from "@/pages/dashboards/admin/locationManagement/AddDivision";
import DivisionManagement from "@/pages/dashboards/admin/locationManagement/DivisionManagement";
import AllParcels from "@/pages/dashboards/admin/parcelManagement/AllParcels";
import AddUser from "@/pages/dashboards/admin/userManagement/AddUser";
import UserManagement from "@/pages/dashboards/admin/userManagement/UserManagement";
import type { ISidebarItem } from "@/types";
import { 
  BarChart3, 
  Package, 
  Users, 
  MapPin, 
  TrendingUp,
  UserCheck,
  PieChart
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
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
        icon: TrendingUp,
      },
      {
        title: "Statistics",
        url: "/admin/statistics",
        component: ParcelStatistics,
        icon: PieChart,
      },
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
      {
        title: "Add User",
        url: "/admin/add-user",
        component: AddUser,
        icon: UserCheck,
      },
    ],
  },
  {
    title: "Location Management",
    items: [
      {
        title: "Divisions",
        url: "/admin/divisions",
        component: DivisionManagement,
        icon: MapPin,
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision,
        icon: MapPin,
      },
    ],
  },
];