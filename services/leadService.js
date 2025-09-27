import { getPaginatedResults } from "../helpers/pagination.helper.js";
import Lead from "../models/lead.js";

const LeadService = {
  createLead: async (data) => {
    const lead = await Lead.create(data);
    return lead;
  },

  getAllLeads: async (query) => {
    const data = await getPaginatedResults(
      Lead,
      ["companyName", "name", "email", "phone", "location", "status"],
      query
    );
    return data;
  },

  getLeadById: async (id) => {
    const lead = await Lead.findById(id);
    return lead;
  },

  updateLead: async (id, data) => {
    const lead = await Lead.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return lead;
  },

  deleteLead: async (id) => {
    const lead = await Lead.findByIdAndDelete(id);
    return lead;
  },
};

export default LeadService;
