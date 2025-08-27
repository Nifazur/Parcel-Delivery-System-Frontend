import LoadingPage from "@/components/layout/LoadingPage";
import { useUserInfoQuery } from "@/redux/features/authApi";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";


export const withAuth = (
  Component: ComponentType,
  requiredRole?: TRole | TRole[]
) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    const user = data?.data;
    if (isLoading) {
      return <LoadingPage></LoadingPage>;
    }

    if (!user?.email) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole) {
      const userRoles: TRole[] = user?.role ?? [];

      if (Array.isArray(requiredRole)) {
        const hasRole = requiredRole.some((role) => userRoles.includes(role));
        if (!hasRole) {
          return <Navigate to="/unauthorized" replace />;
        }
      } else {
        if (!userRoles.includes(requiredRole)) {
          return <Navigate to="/unauthorized" replace />;
        }
      }
    }

    return <Component />;
  };
};