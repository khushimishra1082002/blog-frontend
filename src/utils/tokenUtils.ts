// utils/tokenUtils.ts
import {jwtDecode} from "jwt-decode";

export interface DecodedToken {
  id: string;
  email?: string;
  name?: string;
  exp?: number;
  iat?: number;
}

export const getDecodedToken = (): DecodedToken | null => {
  const token = localStorage.getItem("token"); 
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
