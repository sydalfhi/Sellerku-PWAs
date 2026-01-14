// utils/getStoredUser.ts

export interface StoredUserData {
    [key: string]: any;
}

export const getStoredUserData = (): StoredUserData | null => {
    try {
        const storedAuth = localStorage.getItem("auth-storage");
        if (!storedAuth) return null;

        const authData = JSON.parse(storedAuth);
        return authData?.state?.user?.data ?? null;
    } catch (error) {
        console.error("Error parsing stored auth:", error);
        return null;
    }
};
