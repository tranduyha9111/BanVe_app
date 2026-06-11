import { debugError } from "@/lib/debug";

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    debugError("Token validation error:", error);
    return true;
  }
};

export const getTokenExpiryTime = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch (error) {
    debugError("Get token expiry error:", error);
    return null;
  }
};

export const shouldRefreshToken = (
  token: string,
  bufferMinutes: number = 5,
): boolean => {
  const expiryTime = getTokenExpiryTime(token);
  if (!expiryTime) return true;

  const bufferTime = bufferMinutes * 60 * 1000;
  return Date.now() >= expiryTime - bufferTime;
};
