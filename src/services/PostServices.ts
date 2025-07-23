import api from "../utils/api";
import conf from "../config/Conf"

export const getAllPostsData = async () => {
  try {
    const response = await api.get(conf.GetAllPostsUrl); 
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching posts",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSinglePostData = async (id: string) => {
  try {
    const response = await api.get(`${conf.SinglePostUrl}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching single post:", error.response?.data || error.message);
    throw error;
  }
};

export const addNewPostData = async (formData: FormData) => {
    try {
      const response = await api.post(conf.CreateNewPostUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          requiresAuth: true, 
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Add post error:", error);
      throw error;
    }
  };

  export const deletePostData = async (postId: string) => {
    try {
      const response = await api.delete(`${conf.DeletePostUrl}/${postId}`, {
        headers: {
          requiresAuth: true, 
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Delete post error:", error.response?.data || error.message);
      throw error;
    }
  };

  export const editPostData = async (id: string, values) => {
    try {
      const response = await api.put(`${conf.UpdatePostUrl}/${id}`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
          requiresAuth: true,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Edit post error:", error.response?.data || error.message);
      throw error;
    }
  };
  
  