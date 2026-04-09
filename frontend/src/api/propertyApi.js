import api from "./api";

const propertyApi = {
  getAllProperties: async (page = 1, limit = 6, search = "") => {
    try {
      const response = await api.get(`/properties?page=${page}&limit=${limit}&search=${search}`);
      return response;
    } catch (error) {
      throw error.message || "An error occurred";
    }
  },

  getPropertyById: async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response;
    } catch (error) {
      throw error.message || "An error occurred";
    }
  },
};

export default propertyApi;
