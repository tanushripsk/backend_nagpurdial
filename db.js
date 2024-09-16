const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/NagpurDial1";
const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);

    console.log("mongo connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
module.exports = connectToMongo;
