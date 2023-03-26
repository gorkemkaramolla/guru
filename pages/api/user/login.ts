import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../middleware/mongodb";
import User from "../../../model/user.model";
import { ObjectId } from "mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === "GET") {
    const users = await User.find({});
    res.status(201).json(users);
  } else if (req.method === "POST") {
    try {
      const formData = req.body;
      console.log(formData);
      const user = await User.findOne(formData.email);
      if (user) {
        user.password === formData.password ? "session" : "error";
        res.status(200).send("Logged in successfully");
      }
    } catch (e) {
      res.status(401).send("bad credentials");
    }
    // } else if (req.method === "DELETE") {
    // } else if (req.method === "PUT") {
    // } else res.status(200).json({ name: "John Doe" });
  }
}
export default connectDB(handler);
