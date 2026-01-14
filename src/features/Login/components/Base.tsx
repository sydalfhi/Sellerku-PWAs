import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/login.schema";
import type { LoginFormValues } from "@/schemas/login.schema";
import { useLogin } from "../hooks/useLogin";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function LoginBase() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync, isPending } = useLogin();
  const navigate = useNavigate();
  const location = useLocation(); // ambil state dari middleware

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    await mutateAsync(data);

    const from = location.state?.from?.pathname || "/home";

    navigate(from, { replace: true });
  };

  return (
    <div className="mt-[10vh] flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="rounded-2xl p-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#1e1e1e" }}
            >
              Welcome Back
            </h1>
            <p className="text-sm" style={{ color: "#37393d" }}>
              Please enter your credentials to sign in
            </p>
          </div>

          {/* Error Message dari root */}
          {errors.root && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{errors.root.message}</p>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium"
                style={{ color: "#37393d" }}
              >
                Email or Username
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="text"
                  {...register("email")}
                  className={`pl-10 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                    errors.email
                      ? "border-red-300 focus:ring-red-200"
                      : "border-[#d7d0fe] focus:ring-[#d7d0fe]"
                  }`}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#1e1e1e",
                  }}
                  placeholder="Enter your email"
                  disabled={isPending}
                />
                <div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: errors.email ? "#f87171" : "#d7d0fe" }}
                >
                  📧
                </div>
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium"
                  style={{ color: "#37393d" }}
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm hover:underline transition-all"
                  style={{ color: "#1e1e1e" }}
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`pl-10 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all pr-12 ${
                    errors.password
                      ? "border-red-300 focus:ring-red-200"
                      : "border-[#d7d0fe] focus:ring-[#d7d0fe]"
                  }`}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#1e1e1e",
                  }}
                  placeholder="Enter your password"
                  disabled={isPending}
                />
                <div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: errors.password ? "#f87171" : "#d7d0fe" }}
                >
                  🔒
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium transition-all hover:opacity-80 disabled:opacity-50"
                  style={{ color: "#1e1e1e" }}
                  disabled={isPending}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "#d7d0fe",
                color: "#1e1e1e",
              }}
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#efecff" }}
            ></div>
            <span className="px-4 text-sm" style={{ color: "#37393d" }}>
              or
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "#efecff" }}
            ></div>
          </div>

          {/* Register Section */}
          <div className="text-center">
            <p className="text-sm" style={{ color: "#37393d" }}>
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="font-semibold hover:underline transition-all"
                style={{ color: "#1e1e1e" }}
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs" style={{ color: "#37393d" }}>
            © 2025 Sellerku POS . All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
