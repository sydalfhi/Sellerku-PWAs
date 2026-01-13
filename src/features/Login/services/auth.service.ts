import type { LoginFormValues } from "@/schemas/login.schema";
import axios from "axios";
import qs from "qs"; 

export const loginUser = async (loginData: LoginFormValues) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/login`;

    const response = await axios.post(
      url,
      qs.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    
    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};



// export const loginUser = async (loginData: LoginFormValues) => {
//     // SIMULASI (punya kamu)
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     return {
//         success: true,
//         data: {
//             email: loginData.email,
//             emp_name: "Abdul Somad",
//             buss_name: "hat hat cap",
//             store_id: "4",
//             store_name: "Toko 1",
//             store_address: "jln simpang merpati",
//         },
//         token: "dummy_token_" + Date.now(),
//     };
// };
