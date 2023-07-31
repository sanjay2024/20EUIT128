const asyncHandler = require("express-async-handler");
const companies = require("../Model/companyModel");
const jwt = require("jsonwebtoken");
const authMiddleware = asyncHandler(async (req, res, next) => {
  let tokens;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      tokens = req.headers.authorization.split(" ")[1];
      console.log(process.env.JWT_KEY);
      const decode = jwt.verify(tokens, process.env.JWT_KEY);
      console.log(decode);
      const company = await companies.findById(decode.id);
      if (!company) {
        throw new Error("Company not found for the provided JWT.");
      }
      req.company = company;
      next();
    } catch (e) {
      console.error("JWT verification error:", e.message);
      res.status(401);
      return res.json({ error: "Invalid Credential" });
    }
  } else {
    res.status(401);
    return res.json({ error: "Authentication token not found." });
  }
  next();
});

module.exports = authMiddleware;
