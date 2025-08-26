import type { Parcel, ParcelStatus } from '@/types';

export interface DashboardStats {
  totalParcels: number;
  pending: number;
  delivered: number;
  cancelled: number;
}

export interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export interface ParcelTableProps {
  parcels: Parcel[];
  onViewDetails: (parcel: Parcel) => void;
}

export interface StatusBadgeProps {
  status: Parcel['status'];
}
export interface Receiver {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface StatusLog {
  status: ParcelStatus;
  timestamp: string;
  note?: string;
  location?: string;
  updatedBy?: string; // user/admin id
}

