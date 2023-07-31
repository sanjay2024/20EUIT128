const asyncHandle = require("express-async-handler");
const Users = require("../models/Users");
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
      const user = await Users.findById(decode.id);
      req.user = user;
      next();
    } catch (e) {
      res.status(401);
      throw new Error("Invalid Credential");
    }
  }
  next();
});
module.exports = authMiddleware;
