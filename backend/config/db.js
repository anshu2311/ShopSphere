const mongoose = require("mongoose");

const connectDB = async () => {
 try {
  if (!process.env.MONGO_URI) {
   throw new Error("MONGO_URI is not set. Add it to backend/.env.");
  }

  await mongoose.connect(process.env.MONGO_URI, {
   serverSelectionTimeoutMS: 10000,
  });
  console.log("MongoDB connected successfully");
 } catch (err) {
  console.error(`MongoDB connection failed: ${err.message}`);
    if (err.reason?.servers) {
     for (const [host, details] of err.reason.servers) {
        console.error(`${host}: ${details.error?.message || details.type}`);
     }
    }
  process.exit(1);
 }
};

module.exports = connectDB; 