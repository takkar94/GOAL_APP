const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connString =
      "mongodb://" +
      process.env.MONGO_USERNAME +
      ":" +
      process.env.MONGO_PASSWORD +
      "@" +
      process.env.MONGO_URI +
      ":" +
      process.env.MONGO_PORT +
      "/";
    console.log(connString);
    // mongodb://admin:admin@localhost:27017/
    const conn = await mongoose.connect(connString);
    console.log(`MongoDB is connected : ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
