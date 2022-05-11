import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: String,
    admin: {
      default: false,
      type: Boolean,
    },
    document: 'string',
    contact: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
  },
  {
    collection: 'users',
  },
);
