import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
    // const users = await User.find({});
    // res.status(201).json(users);
    res.status(200).json('Hello');
  } else if (req.method === 'POST') {
    // const formData = req.body;
    // console.log(formData);
    // const user = await new User({ _id: new ObjectId(), ...formData });
    // await user.save();
    // res.status(200).send("User Created!");
  } else if (req.method === 'DELETE') {
  } else if (req.method === 'PUT') {
  } else res.status(200).json({ name: 'John Doe' });
}
export default handler;
