import api from "./api";

const userApi = {
  register: async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      return response;
    } catch (error) {
      throw error.message || error || "Registration failed. Please try again.";
    }
  },

  login: async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      return response; 
    } catch (error) {
      const status = error.response?.status;
      const serverMsg = error.response?.data?.message;
      if (status === 401 || status === 400) {
        throw serverMsg || "Invalid credentials. Please try again.";
      }
      throw serverMsg || error.message || "Login failed. Please try again.";
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get("/auth/profile");
      return response; 
    } catch (error) {
      throw error.message || error || "Failed to load profile.";
    }
  },
};

export default userApi;
