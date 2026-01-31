import api from "../utils/api";
import conf from "../config/Conf"

export const getAllUsersData = async () => {
  try {
    const response = await api.get(conf.GetAllUsersUrl); 
    console.log("API Response:", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error fetching users",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSingleUserData = async (id: string) => {
  try {
    const response = await api.get(`${conf.SingleUserUrl}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching single user:", error.response?.data || error.message);
    throw error;
  }
};

export const addNewUserData = async (formData: FormData) => {
    try {
      const response = await api.post(conf.CreateNewUserUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          requiresAuth: true, 
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Add user error:", error);
      throw error;
    }
  };

  export const deleteUserData = async (postId: string) => {
    try {
      const response = await api.delete(`${conf.DeleteUserUrl}/${postId}`, {
        headers: {
          requiresAuth: true, 
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Delete User error:", error.response?.data || error.message);
      throw error;
    }
  };

 export const editUserData = async (id: string, formData: FormData) => {
  try {
    const response = await api.put(`${conf.UpdateUserUrl}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        requiresAuth: true,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Edit user error:", error.response?.data || error.message);
    throw error;
  }
};

  
  