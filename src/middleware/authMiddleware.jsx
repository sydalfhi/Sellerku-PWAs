import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

/**
 * 🔐 Route yang BUTUH login
 */
export function RequireAuth() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const location = useLocation();



    if (!isAuthenticated) {
        const from = location.pathname === "/setting" ? "/home" : location;
        return <Navigate to="/auth/login" replace state={{ from }} />;
    }

    return <Outlet />;
}


export function GuestOnly() {
    const isAuthenticated = useAuthStore(
        (state) => state.isAuthenticated
    );

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}
