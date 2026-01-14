import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { loginUser } from "../services/auth.service";
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const loginStore = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: loginUser,

    onMutate: () => {
      toast.loading("Loading...", { id: "login-toast" });
    },

    onSuccess: (data) => {
      loginStore(data.response);
    },

    onError: (error: any) => {
      toast.error(error.message, { id: "login-toast" });
    },
  });
};

