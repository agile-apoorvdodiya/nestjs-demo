import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  contact: String,
  email: String,
  password: String,
}, {
  collection: 'users'
});
