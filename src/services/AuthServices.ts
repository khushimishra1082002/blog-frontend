import api from "../utils/api";
import conf from "../config/Conf";


export interface User {
  _id?: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
}

export interface AuthSuccessResponse {
  success: true;
  user: User;
  token: string;
}

export interface AuthErrorResponse {
  success: false;
  message: string;
}

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;


export const registerUser = async (
  formData: FormData
): Promise<AuthResponse> => {
  try {
    const response = await api.post(conf.RegisterUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const token: string | undefined = response.data.token;
    const user: User = response.data.user ?? response.data;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        })
      );
    }

    return {
      success: true,
      user,
      token: token!,
    };
  } catch (error: any) {
    console.error("Registration Error:", error);

    return {
      success: false,
      message:
        error.response?.data?.message || "Registration failed.",
    };
  }
};


interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (
  values: LoginPayload
): Promise<AuthResponse> => {
  try {
    const response = await api.post(conf.LoginUrl, values);

    if (response.data?.token) {
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return {
        success: true,
        user,
        token,
      };
    }

    throw new Error("Invalid response from server");
  } catch (error: any) {
    console.error("Login Error:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Login failed. Please try again.",
    };
  }
};
