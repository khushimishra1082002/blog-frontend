import api from "../utils/api";
import conf from "../config/Conf"

export const getCommentByPostData = async (postId:string) => {
  try {
    const response = await api.get(`${conf.getCommentByPostUrl}/${postId}`); 
    console.log("API Response:", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error ",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addCommentData = async (values:FormData) => {
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
export const likeCommentData = async (commentId: string) => {
  try {
    const response = await api.post(
      `${conf.likeCommentUrl}/${commentId}`,
      {},
      {
        headers: {
          requiresAuth: true,
        },
      }
    );

    return response.data; 
  } catch (error: any) {
    console.error(
      "Like comment error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const dislikeCommentData = async (commentId: string) => {
  try {
    const response = await api.post(
      `${conf.dislikeCommentUrl}/${commentId}`,
      {},
      {
        headers: {
          requiresAuth: true,
        },
      }
    );

    return response.data; // { message, comment }
  } catch (error: any) {
    console.error(
      "Like comment error:",
      error.response?.data || error.message
    );
    throw error;
  }
};


