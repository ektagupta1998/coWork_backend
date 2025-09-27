import { getPaginatedResults } from "../helpers/pagination.helper.js";
import Proposal from "../models/proposal.js";

const ProposalService = {
  createProposal: async (proposalData) => {
    try {
      const proposal = new Proposal(proposalData);
      return await proposal.save();
    } catch (error) {
      throw error;
    }
  },

  getAllProposals: async (query) => {
    return await getPaginatedResults(Proposal, ["status", "hub"], query);
  },

  getProposalById: async (id) => {
    try {
      return await Proposal.findById(id);
    } catch (error) {
      throw error;
    }
  },

  updateProposal: async (id, updateData) => {
    try {
      return await Proposal.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  },

  deleteProposal: async (id) => {
    try {
      return await Proposal.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  },
};

export default ProposalService;
