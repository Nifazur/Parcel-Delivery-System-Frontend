import SenderProfile from "@/pages/dashboards/sender/account/SenderProfile";
import SenderDashboard from "@/pages/dashboards/sender/dashboard/SenderDashboard";
import CancelledParcels from "@/pages/dashboards/sender/parcelManagement/CancelledParcels";
import CreateParcel from "@/pages/dashboards/CreateParcel";
import DeliveredParcels from "@/pages/dashboards/sender/parcelManagement/DeliveredParcels";
import PendingParcels from "@/pages/dashboards/sender/parcelManagement/PendingParcels";
import SentParcels from "@/pages/dashboards/sender/parcelManagement/SentParcels";
import type { ISidebarItem } from "@/types";

import { 
  Send, 
  Clock, 
  CheckCircle,
  XCircle,
  BarChart3,
  User,
  Plus
} from "lucide-react";

export const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/sender/dashboard",
        component: SenderDashboard,
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Parcel Management",
    items: [
      {
        title: "Create Parcel",
        url: "/sender/create-parcel",
        component: CreateParcel,
        icon: Plus,
      },
      {
        title: "All Sent Parcels",
        url: "/sender/sent-parcels",
        component: SentParcels,
        icon: Send,
      },
      {
        title: "Pending",
        url: "/sender/pending-parcels",
        component: PendingParcels,
        icon: Clock,
      },
      {
        title: "Delivered",
        url: "/sender/delivered-parcels",
        component: DeliveredParcels,
        icon: CheckCircle,
      },
      {
        title: "Cancelled",
        url: "/sender/cancelled-parcels",
        component: CancelledParcels,
        icon: XCircle,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/sender/profile",
        component: SenderProfile,
        icon: User,
      },
    ],
  },
];