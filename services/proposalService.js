import { getPaginatedResults } from "../helpers/pagination.helper.js";
import Proposals from "../models/proposal.js";

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
    try {
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const search = query.search || "";
  
      const matchStage = {};
  
      if (search) {
        matchStage.$or = [
          { "customer.name": { $regex: search, $options: "i" } },
          { "customer.email": { $regex: search, $options: "i" } },
          { "customer.contact_number": { $regex: search, $options: "i" } },
          { "customer.company_name": { $regex: search, $options: "i" } },
          { "customer.location": { $regex: search, $options: "i" } },
          { "status": { $regex: search, $options: "i" } }, 
        ];
      }
  
     
      const aggregateQuery = Proposals.aggregate()
        .lookup({
          from: "users",             
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        })
        .unwind({ path: "$customer", preserveNullAndEmptyArrays: true })
        .match(matchStage)
        .project({
          createdAt: 1,
          status: 1,
          hub: 1,
          "customer.name": 1,
          "customer.email": 1,
          "customer.contact_number": 1,
          "customer.company_name": 1,
          "customer.profile_photo": 1,
        })
        .skip((page - 1) * limit)
        .limit(limit);
  
      const proposalsData = await aggregateQuery.exec();
  
      const total = await Proposals.aggregate()
        .lookup({
          from: "users",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer",
        })
        .unwind({ path: "$customer", preserveNullAndEmptyArrays: true })
        .match(matchStage)
        .count("total")
        .exec();
  
      const totalRows = total[0]?.total || 0;
  
      const proposals = proposalsData.map((p) => ({
        profilePhoto: p.customer?.profile_photo || "",
        companyName: p.customer?.company_name || "",
        name: p.customer?.name || "",
        email: p.customer?.email || "",
        phone: p.customer?.contact_number || "",
        location: p.customer?.location || "",
        createdAt: p.createdAt,
        status: p.status || "",       
      }));
  
      return {
        proposals,
        page,
        totalPages: Math.ceil(totalRows / limit),
        totalRows,
      };
    } catch (err) {
      console.error("Error fetching proposals:", err);
      throw err;
    }
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
