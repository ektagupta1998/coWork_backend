import { getPaginatedResults } from "../helpers/pagination.helper.js";
import Lead from "../models/lead.js";
import Proposals from "../models/proposal.js";

const LeadService = {
  createLead: async (data) => {
    const lead = await Lead.create(data);
    return lead;
  },

  getAllLeads: async (query) => {
    try {
      const proposals = await Proposals.find(query)
        .populate({
          path: "customer_id",
          model: "User",
          select:
            "name location email contact_number company_name profile_photo",
        })
        .select("createdAt")
        .lean();

      const leads = proposals.map((proposal) => {
        const customer = proposal.customer_id || {};
        return {
          profilePhoto: customer?.profile_photo || "",
          companyName: customer.company_name || "",
          name: customer.name || "",
          email: customer.email || "",
          phone: customer.contact_number || "",
          location: customer.location || "",
          createdAt: proposal.createdAt,
        };
      });

      return leads;
    } catch (err) {
      console.error("Error fetching leads:", err);
      throw err;
    }
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
