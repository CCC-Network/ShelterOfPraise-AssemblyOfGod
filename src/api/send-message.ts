// /api/send-message.ts - Excluded in development

import { MongoClient } from "mongodb";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const uri = process.env.VITE_MONGODB_URI!;
const client = new MongoClient(uri);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Connect to the database
    await client.connect();
    const db = client.db("visitorMessages");
    const collection = db.collection("messages");

    // Insert message
    await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    res.status(200).json({ message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error("MongoDB Error:", error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    await client.close();
  }
}
