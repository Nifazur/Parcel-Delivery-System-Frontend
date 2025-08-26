// src/types/parcel.types.ts
import type { IUser } from "./user.types";

export type ParcelStatus =
  | "requested"
  | "approved"
  | "dispatched"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface IStatusLog {
  status: ParcelStatus;
  timestamp: string;
  location?: string;
  updatedBy?: string;
  note?: string;
}

export interface IParcel {
  _id?: string;
  type: string;
  weight: number;
  sender: string | IUser;
  receiver: string | IUser;
  fromAddress: string;
  toAddress: string;
  division: string;
  deliveryDate?: string;
  fee: number;
  trackingId: string;
  status: ParcelStatus;
  statusLogs: IStatusLog[];
  isBlocked?: boolean;
  isCancelled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// For API response (from backend)
export interface Parcel {
  _id: string;
  type: string;
  weight: number;
  sender: string;
  receiver: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  fromAddress: string;
  toAddress: string;
  division: string;
  deliveryDate: string;
  fee: number;
  status: ParcelStatus;
  isBlocked: boolean;
  isCancelled: boolean;
  statusLogs: IStatusLog[];
  createdAt: string;
  updatedAt: string;
  trackingId: string;
  __v: number;
}