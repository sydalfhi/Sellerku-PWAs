// src\middleware\authMiddleware.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import type { FC } from "react";

/**
 * 🔐 Route yang BUTUH login
 */
export const RequireAuth: FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    const from = location.pathname === "/setting" ? "/home" : location;
    return <Navigate to="/auth/login" replace state={{ from }} />;
  }

  return <Outlet />;
};

/**
 * 👤 Route untuk guest only
 */
export const GuestOnly: FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
