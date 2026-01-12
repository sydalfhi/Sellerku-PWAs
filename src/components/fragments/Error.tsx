// components/Error.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface ErrorProps {
  error?: Error;
  statusCode?: number;
  customMessage?: string;
  showBackButton?: boolean;
  fullScreen?: boolean;
}

const Error: React.FC<ErrorProps> = ({
  error,
  statusCode,
  customMessage,
  showBackButton = true,
  fullScreen = true,
}) => {
  const navigate = useNavigate();

  // Determine user-friendly error message based on status code
  const getErrorMessage = () => {
    if (customMessage) return customMessage;

    switch (statusCode) {
      case 400:
        return "The request was invalid. Please check your input and try again.";
      case 401:
        return "You need to be logged in to access this page.";
      case 403:
        return "You don't have permission to access this resource.";
      case 404:
        return "The page or resource you requested was not found.";
      case 429:
        return "Too many requests. Please wait a moment before trying again.";
      case 500:
        return "Something went wrong on our server. Please try again later.";
      case 502:
      case 503:
      case 504:
        return "The service is temporarily unavailable. Please try again later.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white dark:bg-gray-900 z-50"
    : "w-full";

  return (
    <div className={`flex items-center justify-center ${containerClasses}`}>
      <div className="max-w-md mx-auto text-center p-8">
        {/* Error Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          {statusCode && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center">
              {statusCode}
            </div>
          )}
        </div>

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Oops! Something went wrong
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {getErrorMessage()}
        </p>

        {/* Actions */}
        <div className="space-y-4">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Go Back
            </button>
          )}

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition duration-200"
            >
              Refresh Page
            </button>

            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition duration-200"
            >
              Go Home
            </button>
          </div>
        </div>

        {/* Technical details (hidden by default, shown on hover) */}
        {error && import.meta.env.NODE_ENV === "development" && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <details className="text-left">
              <summary className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                Technical Details (Development Only)
              </summary>
              <pre className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs text-gray-700 dark:text-gray-300 overflow-auto">
                {error.message}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default Error;
