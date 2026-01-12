// components/Loading.tsx
import React from "react";

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
  size?: "small" | "medium" | "large";
}

const Loading: React.FC<LoadingProps> = ({
  fullScreen = true,
  message = "Loading...",
  size = "medium",
}) => {
  const sizeClasses = {
    small: "h-8 w-8 border-2",
    medium: "h-12 w-12 border-4",
    large: "h-16 w-16 border-4",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white dark:bg-gray-900 z-50"
    : "";

  return (
    <div className={`flex items-center justify-center ${containerClasses}`}>
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div
          className={`${sizeClasses[size]} animate-spin rounded-full border-gray-200 border-t-blue-500 dark:border-gray-700 dark:border-t-blue-400`}
        ></div>

        {/* Message */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
            {message}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Please wait a moment
          </p>
        </div>

        {/* Optional dots animation */}
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
