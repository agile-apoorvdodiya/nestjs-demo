import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: String,
    admin: {
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
