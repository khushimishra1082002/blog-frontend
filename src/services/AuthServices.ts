import api from "../utils/api";
import conf from "../config/Conf";

// Register User
export const registerUser = async (formData: FormData) => {
  try {
    const response = await api.post(conf.RegisterUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const token = response.data.token;
    const user = response.data.user || response.data;

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

    return { success: true, user, token };
  } catch (error: any) {
    console.error("Registration Error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed.",
    };
  }
};

// Login User
export const loginUser = async (values: Record<string, any>) => {
  try {
    const response = await api.post(conf.LoginUrl, values);

    if (response.data && response.data.token) {
      const { token, role, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      return {
        success: true,
        message: "Login successful!",
        user,
        token,
      };
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error: any) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Login failed. Please try again.",
    };
  }
};
