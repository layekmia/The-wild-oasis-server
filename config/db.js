const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI;
let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) {
    // Reuse existing connection
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
