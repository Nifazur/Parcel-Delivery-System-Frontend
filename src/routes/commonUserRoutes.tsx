import ParcelHistory from "@/pages/dashboards/commonUser/account/ParcelHistory";
import UserProfile from "@/pages/dashboards/commonUser/account/UserProfile";
import UserDashboard from "@/pages/dashboards/commonUser/dashboard/UserDashboard";
import ReceivedParcels from "@/pages/dashboards/receiver/parcelManagement/ReceivedParcels";
import TrackParcel from "@/pages/dashboards/receiver/parcelManagement/TrackParcel";
import CancelledParcels from "@/pages/dashboards/sender/parcelManagement/CancelledParcels";
import CreateParcel from "@/pages/dashboards/CreateParcel";
import DeliveredParcels from "@/pages/dashboards/sender/parcelManagement/DeliveredParcels";
import PendingParcels from "@/pages/dashboards/sender/parcelManagement/PendingParcels";
import SentParcels from "@/pages/dashboards/sender/parcelManagement/SentParcels";
import type{ ISidebarItem } from "@/types";

import { 
  Send, 
  Inbox,
  Plus,
  Clock, 
  CheckCircle,
  XCircle,
  Search,
  BarChart3,
  User,
  History
} from "lucide-react";


export const commonUserSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/common-user/dashboard",
        component: UserDashboard,
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Send Parcels",
    items: [
      {
        title: "Create Parcel",
        url: "/common-user/create-parcel",
        component: CreateParcel,
        icon: Plus,
      },
      {
        title: "Sent Parcels",
        url: "/common-user/sent-parcels",
        component: SentParcels,
        icon: Send,
      },
    ],
  },
  {
    title: "Receive Parcels",
    items: [
      {
        title: "Track Parcel",
        url: "/common-user/track-parcel",
        component: TrackParcel,
        icon: Search,
      },
      {
        title: "Received Parcels",
        url: "/common-user/received-parcels",
        component: ReceivedParcels,
        icon: Inbox,
      },
    ],
  },
  {
    title: "Parcel Status",
    items: [
      {
        title: "Pending",
        url: "/common-user/pending-parcels",
        component: PendingParcels,
        icon: Clock,
      },
      {
        title: "Delivered",
        url: "/common-user/delivered-parcels",
        component: DeliveredParcels,
        icon: CheckCircle,
      },
      {
        title: "Cancelled",
        url: "/common-user/cancelled-parcels",
        component: CancelledParcels,
        icon: XCircle,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "History",
        url: "/common-user/history",
        component: ParcelHistory,
        icon: History,
      },
      {
        title: "Profile",
        url: "/common-user/profile",
        component: UserProfile,
        icon: User,
      },
    ],
  },
];