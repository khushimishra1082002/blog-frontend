import api from "../utils/api";
import conf from "../config/Conf"

export const unlikePostData = async (postId: string, body: object) => {
    try {
      const response = await api.delete(`${conf.unlikePostUrl}/${postId}`, {
      headers: {
        requiresAuth: true,
      },
      data: body, 
    });
      return response.data;
    } catch (error: any) {
      console.error("Delete post error:", error.response?.data || error.message);
      throw error;
    }
  };

  export const likePostData = async (data) => {
    try {
      const response = await api.post(conf.likePostUrl, data , {
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


  export const undislikePostData = async (postId: string, body: object) => {
    try {
      const response = await api.delete(`${conf.unlikePostUrl}/${postId}`, {
      headers: {
        requiresAuth: true,
      },
      data: body, 
    });
      return response.data;
    } catch (error: any) {
      console.error("Delete post error:", error.response?.data || error.message);
      throw error;
    }
  };
