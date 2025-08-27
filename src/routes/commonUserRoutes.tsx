import ReceivedParcels from "@/pages/dashboards/receiver/parcelManagement/ReceivedParcels";
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
} from "lucide-react";
import TrackingSearch from "@/pages/public/4.Tracking/TrackingSearch";
import Profile from "@/components/dashboardComponents/Profile";
import SenderDashboard from "@/pages/dashboards/sender/dashboard/SenderDashboard";
import ReceiverDashboard from "@/pages/dashboards/receiver/dashboard/ReceiverDashboard";


export const commonUserSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Sent Parcel Dashboard",
        url: "/common-user/senderDashboard",
        component: SenderDashboard,
        icon: BarChart3,
      },
      {
        title: "Received Parcel Dashboard",
        url: "/common-user/receiverDashboard",
        component: ReceiverDashboard,
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
        component: TrackingSearch,
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
        title: "Profile",
        url: "/common-user/profile",
        component: Profile,
        icon: User,
      },
    ],
  },
];