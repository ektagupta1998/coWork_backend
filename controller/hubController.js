import hubService from "../services/hubService.js";
import { successResponse, errorResponse, notFoundResponse } from "../helpers/response.helper.js";

const hubController = {
  createHub: async (req, res) => {
    try {
      const hub = await hubService.createHub(req.body);
      return successResponse(res, hub, "Hub created successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to create hub");
    }
  },

  getAllHubs: async (req, res) => {
    try {
      const hubs = await hubService.getAllHubs(req.query);
      return successResponse(res, hubs, "Hubs fetched successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to fetch hubs");
    }
  },

  getHubById: async (req, res) => {
    try {
      const hub = await hubService.getHubById(req.params.id);
      if (!hub) return notFoundResponse(res, "Hub not found");
      return successResponse(res, hub, "Hub fetched successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to fetch hub");
    }
  },

  updateHub: async (req, res) => {
    try {
      const hub = await hubService.updateHub(req.params.id, req.body);
      if (!hub) return notFoundResponse(res, "Hub not found");
      return successResponse(res, hub, "Hub updated successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to update hub");
    }
  },

  deleteHub: async (req, res) => {
    try {
      const hub = await hubService.deleteHub(req.params.id);
      if (!hub) return notFoundResponse(res, "Hub not found");
      return successResponse(res, null, "Hub deleted successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to delete hub");
    }
  },
};

export default hubController;
