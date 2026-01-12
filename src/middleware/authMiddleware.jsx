import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

/**
 * 🔐 Route yang BUTUH login
 */
export function RequireAuth() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const location = useLocation(); // ambil url saat ini

    if (!isAuthenticated) {
        // redirect ke login & simpan tujuan awal di state
        return <Navigate to="/auth/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}


/**
 * 🚫 Route yang HANYA boleh untuk guest (belum login)
 * contoh: /auth/login
 */
export function GuestOnly() {
    const isAuthenticated = useAuthStore(
        (state) => state.isAuthenticated
    );

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}
