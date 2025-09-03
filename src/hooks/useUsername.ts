import { useState, useEffect, createContext, useContext } from "react";
import {
  getCurrentUsername,
  saveUsernameToStorage,
  validateUsernameOrThrow,
} from "../utils/username";

interface UsernameContextType {
  username: string;
  setUsername: (username: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const UsernameContext = createContext<UsernameContextType | undefined>(
  undefined
);

export const useUsername = () => {
  const context = useContext(UsernameContext);
  if (context === undefined) {
    throw new Error("useUsername must be used within a UsernameProvider");
  }
  return context;
};

export const useUsernameState = () => {
  const [username, setUsernameState] = useState<string>("john-doe");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeUsername = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const currentUsername = getCurrentUsername();
        setUsernameState(currentUsername);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to initialize username";
        setError(errorMessage);
        // On error, fall back to default username
        setUsernameState("john-doe");
      } finally {
        setIsLoading(false);
      }
    };

    initializeUsername();
  }, []);

  const setUsername = (newUsername: string) => {
    try {
      setError(null);
      validateUsernameOrThrow(newUsername);
      saveUsernameToStorage(newUsername);
      setUsernameState(newUsername);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to set username";
      setError(errorMessage);
      throw err; // Re-throw so calling code can handle it
    }
  };

  return {
    username,
    setUsername,
    isLoading,
    error,
  };
};
