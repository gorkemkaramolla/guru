import { IUser } from "@/types";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
var Schema = mongoose.Schema;
const userSchema = new Schema<IUser>({
  _id: ObjectId,
  email: { type: String, unique: true },
  name: String,
  surname: String,
  password: String,
  image: String,
});
userSchema.index({ email: 1 }, { unique: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
