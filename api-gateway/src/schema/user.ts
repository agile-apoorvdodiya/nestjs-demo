import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: String,
    isAdmin: {
      default: false,
    },
    contact: String,
    email: String,
    password: String,
  },
  {
    collection: 'users',
  },
);
