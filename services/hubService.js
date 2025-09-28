import Hub from "../models/hub.js";

const hubService = {
  createHub: async (hubData) => {
    try {
      const hub = new Hub(hubData);
      return await hub.save();
    } catch (error) {
      throw new Error("Failed to create hub: " + error.message);
    }
  },

  getAllHubs: async (query = {}) => {
    try {
      return await Hub.find(query);
    } catch (error) {
      throw new Error("Failed to fetch hubs: " + error.message);
    }
  },

  getHubById: async (id) => {
    try {
      return await Hub.findById(id);
    } catch (error) {
      throw new Error("Failed to fetch hub: " + error.message);
    }
  },

  updateHub: async (id, hubData) => {
    try {
      return await Hub.findByIdAndUpdate(id, hubData, { new: true });
    } catch (error) {
      throw new Error("Failed to update hub: " + error.message);
    }
  },

  deleteHub: async (id) => {
    try {
      return await Hub.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Failed to delete hub: " + error.message);
    }
  },
};

export default hubService;
