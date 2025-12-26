import mongoose, { Document, Model, Schema } from "mongoose";

interface IMessage extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const messageSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Message: Model<IMessage> = 
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);