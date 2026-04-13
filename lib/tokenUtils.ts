/* ===== TOKEN UTILITIES ===== */

export const isTokenExpired = (token: string): boolean => {
  try {
    // Regular JWT token check
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Token validation error:", error);
    return true; // If token is invalid, consider it expired
  }
};

export const getTokenExpiryTime = (token: string): number | null => {
  try {
    // Regular JWT token check
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? payload.exp * 1000 : null; // Convert to milliseconds
  } catch (error) {
    console.error("Get token expiry error:", error);
    return null;
  }
};

export const shouldRefreshToken = (
  token: string,
  bufferMinutes: number = 5,
): boolean => {
  const expiryTime = getTokenExpiryTime(token);
  if (!expiryTime) return true;

  const bufferTime = bufferMinutes * 60 * 1000; // Convert minutes to milliseconds
  return Date.now() >= expiryTime - bufferTime;
};
