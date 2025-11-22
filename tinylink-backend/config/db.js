const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("DB Connection Failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
