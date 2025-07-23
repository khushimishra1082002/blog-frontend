import api from "../utils/api";
import conf from "../config/Conf"

export const searchPostData = async (query) => {
    try {
      const response = await api.get(`${conf.SearchPostUrl}?q=${query}`); 
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching search post",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  export const searchCategoryData = async (query) => {
    try {
      const response = await api.get(`${conf.SearchCategoryUrl}?q=${query}`); 
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching search category",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  export const searchUserData = async (query) => {
    try {
      const response = await api.get(`${conf.SearchUserUrl}?q=${query}`); 
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching search category",
        error.response?.data || error.message
      );
      throw error;
    }
  };