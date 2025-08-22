import api from "../utils/api";
import conf from "../config/Conf"

export const getCommentByPostData = async (postId) => {
  try {
    const response = await api.get(`${conf.getCommentByPostUrl}/${postId}`); 
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error ",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addCommentData = async (values) => {
    try {
      const response = await api.post(conf.addCommentUrl, values, {
        headers: {
          requiresAuth: true, 
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Add post error:", error);
      throw error;
    }
  };