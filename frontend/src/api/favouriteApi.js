import api from "./api";

const favouriteApi = {
  getFavourites: async () => {
    try {
      const response = await api.get("/favourites");
      return response;
    } catch (error) {
      throw error.message || "An error occurred";
    }
  },

  addFavourite: async ({ propertyId }) => {
    try {
      const response = await api.post("/favourites", { propertyId });
      return response;
    } catch (error) {
      throw error.message || "An error occurred";
    }
  },

  removeFavourite: async (propertyId) => {
    try {
      const response = await api.delete(`/favourites/${propertyId}`);
      return response;
    } catch (error) {
      throw error.message || "An error occurred";
    }
  },
};

export default favouriteApi;
