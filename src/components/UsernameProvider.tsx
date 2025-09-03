import React from "react";
import { UsernameContext, useUsernameState } from "../hooks/useUsername";
import { UsernameError } from "./UsernameError";

interface UsernameProviderProps {
  children: React.ReactNode;
}

export const UsernameProvider: React.FC<UsernameProviderProps> = ({
  children,
}) => {
  const usernameState = useUsernameState();

  // Show error screen if there's a username validation error
  if (usernameState.error) {
    return (
      <UsernameError
        error={usernameState.error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Show loading state
  if (usernameState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <UsernameContext.Provider value={usernameState}>
      {children}
    </UsernameContext.Provider>
  );
};
