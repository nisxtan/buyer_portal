import api from "./api";

const userApi = {
  register: async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      return response;
    } catch (error) {
      throw error.message || "An error occurred";
    }
  },

  login: async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      return response; 
    } catch (error) {
      throw error.message || "An error occurred";
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get("/auth/profile");
      return response; 
    } catch (error) {
      throw error.message || "An error occurred";
    }
  },
};

export default userApi;
