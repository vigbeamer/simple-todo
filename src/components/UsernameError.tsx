import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface UsernameErrorProps {
  error: string;
  onRetry?: () => void;
}

export const UsernameError: React.FC<UsernameErrorProps> = ({
  error,
  onRetry,
}) => {
  const handleClearURL = () => {
    // Remove username parameter from URL
    const url = new URL(window.location.href);
    url.searchParams.delete("username");
    window.history.replaceState({}, "", url.toString());

    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-red-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Invalid Username
            </h2>
            <p className="text-sm text-gray-600">
              There's an issue with the username parameter
            </p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleClearURL}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Continue with Default User</span>
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Valid username formats: kebab-case, camelCase, snake_case (no
              spaces)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
