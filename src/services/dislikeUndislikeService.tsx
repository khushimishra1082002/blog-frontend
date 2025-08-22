import api from "../utils/api";
import conf from "../config/Conf"

export const undislikePostData = async (postId: string, body: object) => {
    try {
      const response = await api.delete(`${conf.unDislikePostUrl}/${postId}`, {
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


  export const dislikePostData = async (data) => {
      try {
        const response = await api.post(conf.disLikePostUrl, data , {
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
  