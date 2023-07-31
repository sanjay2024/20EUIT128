const jwt = require("jsonwebtoken");
const genearateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
};
module.exports = genearateToken;
