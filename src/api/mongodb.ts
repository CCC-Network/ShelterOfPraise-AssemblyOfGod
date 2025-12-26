
import mongoose from "mongoose";

const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || "mongodb://localhost:27017/visitorMessages";

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  return mongoose.connect(MONGODB_URI, {
    dbName: "visitorMessages",
  });
}

