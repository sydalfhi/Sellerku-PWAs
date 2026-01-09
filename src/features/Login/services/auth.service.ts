import { LoginFormValues } from "@/schemas/login.schema";

export const loginUser = async (loginData: LoginFormValues) => {
    // SIMULASI (punya kamu)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
        success: true,
        data: {
            email: loginData.email,
            emp_name: "Abdul Somad",
            buss_name: "hat hat cap",
            store_id: "4",
            store_name: "Toko 1",
            store_address: "jln simpang merpati",
        },
        token: "dummy_token_" + Date.now(),
    };
};
