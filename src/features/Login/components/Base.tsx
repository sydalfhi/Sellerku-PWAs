import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginBase() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle login logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mt-[10vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="rounded-2xl p-4 ">
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  name="email"
                  type="text"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#d7d0fe",
                    color: "#1e1e1e",
                  }}
                  placeholder="Enter your email or username"
                />
                <div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: "#d7d0fe" }}
                >
                  📧
                </div>
              </div>
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className=" pl-10 w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all pr-12"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#d7d0fe",
                    color: "#1e1e1e",
                  }}
                  placeholder="Enter your password"
                />
                <div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: "#d7d0fe" }}
                >
                  🔒
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium transition-all hover:opacity-80"
                  style={{ color: "#1e1e1e" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: "#d7d0fe",
                color: "#1e1e1e",
              }}
            >
              Sign In
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
