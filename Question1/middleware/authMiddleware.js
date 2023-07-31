const asyncHandle = require("express-async-handler");
const companies = require('../Model/companyModel');
const jwt = require("jsonwebtoken");
const authMiddleware = asyncHandle(async (req, res, next) => {
  let tokens;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      tokens = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(tokens, process.env.JWT_KEY);
      const company = await companies.findById(decode.id);
      req.company = company;
      next();
    } catch (e) {
      res.status(401);
      throw new Error("Invalid Credential");
    }
  }
  next();
});
module.exports = authMiddleware;
