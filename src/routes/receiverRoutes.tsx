import Profile from "@/components/dashboardComponents/Profile";
import ReceiverDashboard from "@/pages/dashboards/receiver/dashboard/ReceiverDashboard";
import CompletedDeliveries from "@/pages/dashboards/receiver/parcelManagement/CompletedDeliveries";
import PendingDeliveries from "@/pages/dashboards/receiver/parcelManagement/PendingDeliveries";
import ReceivedParcels from "@/pages/dashboards/receiver/parcelManagement/ReceivedParcels";
import TrackParcel from "@/pages/dashboards/receiver/parcelManagement/TrackParcel";
import type { ISidebarItem } from "@/types";


import { 
  Inbox, 
  Clock, 
  CheckCircle,
  Search,
  BarChart3,
  User
} from "lucide-react";

export const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/receiver/dashboard",
        component: ReceiverDashboard,
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Parcel Management",
    items: [
      {
        title: "Track Parcel",
        url: "/receiver/track-parcel",
        component: TrackParcel,
        icon: Search,
      },
      {
        title: "Received Parcels",
        url: "/receiver/received-parcels",
        component: ReceivedParcels,
        icon: Inbox,
      },
      {
        title: "Pending Deliveries",
        url: "/receiver/pending-deliveries",
        component: PendingDeliveries,
        icon: Clock,
      },
      {
        title: "Completed",
        url: "/receiver/completed-deliveries",
        component: CompletedDeliveries,
        icon: CheckCircle,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/receiver/profile",
        component: Profile,
        icon: User,
      },
    ],
  },
];