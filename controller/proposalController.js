import ProposalService from "../services/proposalService.js";
import { successResponse, errorResponse, notFoundResponse } from "../helpers/response.helper.js";

const proposalController = {

  createProposal: async (req, res) => {
    try {
      const proposal = await ProposalService.createProposal(req.body);
      return successResponse(res, proposal, "Proposal created successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to create proposal");
    }
  },

  getAllProposals: async (req, res) => {
    try {
      const proposals = await ProposalService.getAllProposals(req.query);
      return successResponse(res, proposals, "Proposals fetched successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to fetch proposals");
    }
  },

  getProposalById: async (req, res) => {
    try {
      const proposal = await ProposalService.getProposalById(req.params.id);
      if (!proposal) return notFoundResponse(res, "Proposal not found");
      return successResponse(res, proposal, "Proposal fetched successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to fetch proposal");
    }
  },

  updateProposal: async (req, res) => {
    try {
      const updatedProposal = await ProposalService.updateProposal(req.params.id, req.body);
      if (!updatedProposal) return notFoundResponse(res, "Proposal not found");
      return successResponse(res, updatedProposal, "Proposal updated successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to update proposal");
    }
  },

  deleteProposal: async (req, res) => {
    try {
      const deletedProposal = await ProposalService.deleteProposal(req.params.id);
      if (!deletedProposal) return notFoundResponse(res, "Proposal not found");
      return successResponse(res, null, "Proposal deleted successfully");
    } catch (error) {
      return errorResponse(res, error, "Failed to delete proposal");
    }
  }
};

export default proposalController;
