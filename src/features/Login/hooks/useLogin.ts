import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { loginUser } from "../services/auth.service";

export const useLogin = () => {
    const loginStore = useAuthStore((s) => s.login);

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            loginStore(data.data);

        },
    });
};
