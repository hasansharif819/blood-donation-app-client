// import { jwtDecode } from "jwt-decode";

// export const decodedToken = (token: string) => {
//   return jwtDecode(token);
// };

import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: string) => {
  if (!token || typeof token !== "string" || token.split(".").length !== 3) {
    console.warn("Invalid JWT token provided");
    return null;
  }

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
