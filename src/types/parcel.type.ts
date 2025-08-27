/* eslint-disable @typescript-eslint/no-explicit-any */



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

export interface Person {
    _id: string;
    name: string;
    email: string;
}

export interface IParcelDetails {
    _id: string;
    type: string;
    weight: number;
    sender: Person;
    receiver: Person;
    fromAddress: string;
    toAddress: string;
    division: string;
    deliveryDate: string;
    fee: number;
    status: string;
    isBlocked: boolean;
    isCancelled: boolean;
    statusLogs: any[];
    createdAt: Date;
    updatedAt: string;
    trackingId: string;
    __v?: number;
}