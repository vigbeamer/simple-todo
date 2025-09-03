/**
 * Username utility functions for validation and localStorage management
 */

const USERNAME_STORAGE_KEY = "todo-app-username";
const DEFAULT_USERNAME = "john-doe";

/**
 * Validates if a username is in the correct format (no spaces, single word)
 * Accepts kebab-case, camelCase, snake_case, or any format without spaces
 */
export const validateUsername = (username: string): boolean => {
  if (!username || typeof username !== "string") {
    return false;
  }

  // Check if username contains spaces
  if (username.includes(" ")) {
    return false;
  }

  // Check if username is not empty after trimming
  if (username.trim().length === 0) {
    return false;
  }

  // Additional validation: only allow alphanumeric characters, hyphens, underscores
  const validUsernameRegex = /^[a-zA-Z0-9_-]+$/;
  return validUsernameRegex.test(username);
};

/**
 * Throws an error if username contains spaces or is invalid
 */
export const validateUsernameOrThrow = (username: string): void => {
  if (!validateUsername(username)) {
    if (username.includes(" ")) {
      throw new Error(
        "Username cannot contain spaces. Please use kebab-case, camelCase, snake_case, or any format without spaces."
      );
    }
    throw new Error(
      "Username must contain only alphanumeric characters, hyphens, and underscores."
    );
  }
};

/**
 * Gets username from localStorage or returns default
 */
export const getUsernameFromStorage = (): string => {
  try {
    const storedUsername = localStorage.getItem(USERNAME_STORAGE_KEY);
    if (storedUsername && validateUsername(storedUsername)) {
      return storedUsername;
    }
  } catch (error) {
    console.warn("Failed to read username from localStorage:", error);
  }
  return DEFAULT_USERNAME;
};

/**
 * Saves username to localStorage after validation
 */
export const saveUsernameToStorage = (username: string): void => {
  validateUsernameOrThrow(username);
  try {
    localStorage.setItem(USERNAME_STORAGE_KEY, username);
  } catch (error) {
    console.error("Failed to save username to localStorage:", error);
    throw new Error("Failed to save username to storage");
  }
};

/**
 * Extracts username from URL parameters
 */
export const getUsernameFromURL = (): string | null => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    if (username && validateUsername(username)) {
      return username;
    }

    if (username && !validateUsername(username)) {
      // Username exists but is invalid, we'll handle this in the calling code
      return username;
    }

    return null;
  } catch (error) {
    console.warn("Failed to parse URL parameters:", error);
    return null;
  }
};

/**
 * Gets the current active username by checking URL first, then localStorage, then default
 */
export const getCurrentUsername = (): string => {
  // First check URL parameter
  const urlUsername = getUsernameFromURL();
  if (urlUsername) {
    try {
      validateUsernameOrThrow(urlUsername);
      // Valid username from URL, save it to storage and return
      saveUsernameToStorage(urlUsername);
      return urlUsername;
    } catch (error) {
      // Invalid username from URL, throw the error
      throw error;
    }
  }

  // No URL parameter, get from storage or default
  return getUsernameFromStorage();
};
