import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

const connectDB =
  (handler: {
    (req: NextApiRequest, res: NextApiResponse<any>): Promise<void>;
  }) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
    }
    // Use new db connection
    mongoose.connect(process.env?.MONGODB_URI!);
    return handler(req, res);
  };

export default connectDB;
