import UserService from "../services/userServices.js";
import { successResponse, errorResponse, notFoundResponse } from "./../helpers/response.helper.js";
import jwt from "jsonwebtoken";


const userController = {

  createUser: async (req, res) => {
    try {
      const user = await UserService.createUser(req.body);
      return successResponse(res, user, 'User created successfully');
    } catch (error) {
      return errorResponse(res, error, 'Failed to create user');
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers(req.query);
      return successResponse(res, users, 'Users fetched successfully');
    } catch (error) {
      return errorResponse(res, error, 'Failed to fetch users');
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) return notFoundResponse(res, 'User not found');
      return successResponse(res, user, 'User fetched successfully');
    } catch (error) {
      return errorResponse(res, error, 'Failed to fetch user');
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      if (!updatedUser) return notFoundResponse(res, 'User not found');
      return successResponse(res, updatedUser, 'User updated successfully');
    } catch (error) {
      return errorResponse(res, error, 'Failed to update user');
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await UserService.deleteUser(req.params.id);
      if (!deletedUser) return notFoundResponse(res, 'User not found');
      return successResponse(res, null, 'User deleted successfully');
    } catch (error) {
      return errorResponse(res, error, 'Failed to delete user');
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.getUserByEmail(email);
      if (!user) return notFoundResponse(res, "User not found");

      const decryptedPassword = user.getDecryptedPassword();
      if (decryptedPassword !== password) {
        return errorResponse(res, null, "Invalid email or password", 401);
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || "secretKey",
        { expiresIn: "1d" }
      );

      return successResponse(res, { token, user }, "Login successful");
    } catch (error) {
      return errorResponse(res, error, "Login failed");
    }
  },

  createCustomUser: async (req, res) => {
    try {
      const user = await UserService.createCustomUser(req.body);
      return successResponse(res, user, 'Custom user created successfully');
    } catch (error) {
      return errorResponse(res, error, 'Failed to create custom user');
    }
  },

  getCustomers: async (req, res) => {
    try {
      const customers = await UserService.getCustomers(req.query);
      return successResponse(res, customers, 'Customers fetched successfully');
    } catch (error) {
      return errorResponse(res, error, 'Failed to fetch customers');
    }
  }

};

export default userController;
