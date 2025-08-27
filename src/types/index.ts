/* eslint-disable @typescript-eslint/no-explicit-any */
export type ISidebarItem = {
  title: string;
  items: {
    title: string;
    url: string;
    component: React.ComponentType<any>;
    icon?: React.ComponentType<any>;
  }[];
}

export type TRole =  "SUPER_ADMIN" | "ADMIN" | "USER" | "SENDER" | "RECEIVER"

// types/index.ts

// Common response interface
export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
  };
}

// User related types
export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  SENDER = "SENDER",
  RECEIVER = "RECEIVER"
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED"
}

export interface IAuthProvider {
  provider: string;
  providerId: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  picture?: string;
  address?: string;
  role: Role[];
  isActive?: IsActive;
  isDeleted?: boolean;
  auths: IAuthProvider[];
  createdAt?: string;
  updatedAt?: string;
}

// Division types
export interface IDivision {
  _id?: string;
  name: string;
  basePrice: number;
  createdAt?: string;
  updatedAt?: string;
}

// Parcel related types
export type ParcelStatus = 'requested' | 'approved' | 'dispatched' | 'in_transit' | 'delivered' | 'cancelled';

export interface IStatusLog {
  status: ParcelStatus;
  timestamp: Date;
  location?: string;
  updatedBy: string;
  note?: string;
}

export interface IParcel {
  _id?: string;
  type: string;
  weight: number;
  sender: IUser;
  receiver: string;
  fromAddress: string;
  toAddress: string;
  division: string | IDivision;
  deliveryDate?: Date;
  fee: number;
  trackingId: string;
  status: ParcelStatus;
  statusLogs: IStatusLog[];
  isBlocked?: boolean;
  isCancelled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateParcelRequest {
  type: string;
  weight: number;
  receiver: string;
  fromAddress: string;
  toAddress: string;
  division: string;
  deliveryDate?: Date;
}

export interface IUpdateParcelStatusRequest {
  status: ParcelStatus;
  location?: string;
  note?: string;
}

// Auth related types
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface IResetPasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: Omit<IUser, 'password'>;
}

// Error types
export interface IErrorSource {
  path: string;
  message: string;
}

export interface IErrorResponse {
  success: false;
  message: string;
  errorSources?: IErrorSource[];
  err?: any;
  stack?: string;
}

export interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
}

interface Receiver {
  _id: string;
  name: string;
  email: string;
}

interface StatusLog {
  status: ParcelStatus;
  timestamp: string;
  updatedBy: string;
  note: string;
}

export interface Parcel {
  _id?: string;
  type: string;
  weight: number;
  sender: string;
  receiver: Receiver;
  fromAddress: string;
  toAddress: string;
  division: string;
  deliveryDate: string;
  fee: number;
  status: ParcelStatus;
  isBlocked: boolean;
  isCancelled: boolean;
  statusLogs: StatusLog[];
  createdAt: string;
  updatedAt: string;
  trackingId: string;
  __v?: number;
}

// export interface IParcel {
//   _id?: string;
//   type: string;
//   weight: number;
//   sender: string | IUser;
//   receiver: string | IUser;
//   fromAddress: string;
//   toAddress: string;
//   division: string | IDivision;
//   deliveryDate?: Date;
//   fee: number;
//   trackingId: string;
//   status: ParcelStatus;
//   statusLogs: IStatusLog[];
//   isBlocked?: boolean;
//   isCancelled?: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// }