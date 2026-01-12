import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { loginUser } from "../services/auth.service";

export const useLogin = () => {
    const loginStore = useAuthStore((s) => s.login);

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {

            if (data.success) {
                loginStore(data.data);
            }else{
                console.info(data);
            }

        },
        onError: (error) => {
            throw error;
        },
    });
};
