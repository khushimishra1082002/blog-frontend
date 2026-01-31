import api from "../utils/api";
import conf from "../config/Conf";

export const LonginAdmin = async (values: Record<string, any>) => {
  try {
    const response = await api.post(conf.adminLoginUrl, values);

    console.log("Admin Login Response Data:", response.data);

    if (response.data && response.data.token) {
      const { token, admin } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", admin.role); 
      localStorage.setItem("user", JSON.stringify(admin)); 

      return {
        success: true,
        message: response.data.message,
        user: admin,
        token,
      };
    }

    throw new Error("Invalid response");
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Login failed. Please try again.",
    };
  }
};
