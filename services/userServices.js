import { getPaginatedResults } from "../helpers/pagination.helper.js";
import User from "../models/User.js";

const UserService = {
  createUser: async (userData) => {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw error;
    }
  },

  getAllUsers: async (query) => {
    const data = await getPaginatedResults(
      User,
      ["name", "email", "type", "location"],
      query
    );
    return data;
  },

  getUserById: async (userId) => {
    try {
      return await User.findById(userId);
    } catch (error) {
      throw error;
    }
  },
  getUserByEmail: async (email) => {
    return await User.findOne({ email });
  },

  updateUser: async (userId, updateData) => {
    try {
      return await User.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  },

  createCustomUser: async (userData) => {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw error;
    }
  },

getCustomers: async (query = {}) => {
  try {
    const filters = { ...query, type: "customer" }; 

    const data = await getPaginatedResults(
      User,
      ["name", "email", "location"],
      filters
    );

    return data;
  } catch (error) {
    throw new Error("Error fetching customers: " + error.message);
  }
}


};

export default UserService;
