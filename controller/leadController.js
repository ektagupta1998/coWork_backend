import LeadService from "../services/leadService.js";
import { successResponse, errorResponse, notFoundResponse } from "../helpers/response.helper.js";

const leadController = {
  createLead: async (req, res) => {
    try {
      const lead = await LeadService.createLead(req.body);
      return successResponse(res, lead, "Lead created successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to create lead");
    }
  },

  getAllLeads: async (req, res) => {
    try {
      const leads = await LeadService.getAllLeads(req.query);
      return successResponse(res, leads, "Leads fetched successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to fetch leads");
    }
  },

  getLeadById: async (req, res) => {
    try {
      const lead = await LeadService.getLeadById(req.params.id);
      if (!lead) return notFoundResponse(res, "Lead not found");
      return successResponse(res, lead, "Lead fetched successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to fetch lead");
    }
  },

  updateLead: async (req, res) => {
    try {
      const lead = await LeadService.updateLead(req.params.id, req.body);
      if (!lead) return notFoundResponse(res, "Lead not found");
      return successResponse(res, lead, "Lead updated successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to update lead");
    }
  },

  deleteLead: async (req, res) => {
    try {
      const lead = await LeadService.deleteLead(req.params.id);
      if (!lead) return notFoundResponse(res, "Lead not found");
      return successResponse(res, null, "Lead deleted successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to delete lead");
    }
  },
};

export default leadController;
