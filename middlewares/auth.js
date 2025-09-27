const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helpers/response.helper");

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return errorResponse(
      res,
      "Access denied. Token missing.",
      "Authorization header is missing or invalid.",
      401
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.doc_id = decoded.doc_id;
    next();
  } catch (error) {
    return errorResponse(res, "Invalid or expired token.", error.message, 401);
  }
};

module.exports = authentication;
