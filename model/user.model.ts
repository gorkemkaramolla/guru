import { IUser } from '@/types';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
var Schema = mongoose.Schema;
const userSchema = new Schema<IUser>({
  _id: ObjectId,
  email: String,
  name: String,
  surname: String,
  password: String,
  image: String,
});

export default mongoose.models.User || mongoose.model('User', userSchema);
