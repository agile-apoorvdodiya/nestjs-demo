import { Schema } from 'mongoose';

export const MessagesSchema = new Schema(
  {
    sender: Schema.Types.ObjectId,
    receiver: Schema.Types.ObjectId,
    message: String,
    createAt: Date,
  },
  {
    collection: 'messages',
  },
);
