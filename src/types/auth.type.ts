/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IUser } from ".";

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