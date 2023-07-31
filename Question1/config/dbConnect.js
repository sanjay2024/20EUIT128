const mongoose = require("mongoose");
const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection Established");
    })
    .catch((e) => console.log(e));
};
module.exports = dbConnect;
