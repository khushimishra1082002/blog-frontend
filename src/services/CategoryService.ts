import api from "../utils/api";
import conf from "../config/Conf"

interface Category {
  name: string;
}

export const getAllCategoryData = async () => {
  try {
    const response = await api.get(conf.GetAllCategoryUrl); 
    console.log("API Response:", response.data);
    return response.data;
  } catch (error:any) {
    console.error(
      "Error fetching category",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getSingleCategoryData = async (id: string) => {
  try {
    const response = await api.get(`${conf.SingleCategoryUrl}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching single category:", error.response?.data || error.message);
    throw error;
  }
};

export const addNewCategoryData = async (values:Category) => {
    try {
      const response = await api.post(conf.CreateNewCategoryUrl, values, {
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

  export const deleteCategoryData = async (categoryId: string) => {
    try {
      const response = await api.delete(`${conf.DeleteCategoryUrl}/${categoryId}`, {
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

  export const editCategoryData = async (id: string, formData:Category) => {
    try {
      const response = await api.put(`${conf.UpdateCategoryUrl}/${id}`, formData, {
        headers: {
          requiresAuth: true,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Edit category error:", error.response?.data || error.message);
      throw error;
    }
  };
  
  