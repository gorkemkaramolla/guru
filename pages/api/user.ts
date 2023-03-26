import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middleware/mongodb';
import User from '../../model/user.model';
import { ObjectId } from 'mongodb';

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
    const users = await User.find({});
    res.status(201).json(users);
  } else if (req.method === 'POST') {
    const formData = req.body;
    console.log(formData);
    const user = await new User({ _id: new ObjectId(), ...formData });
    await user.save();
    res.status(200).send('User Created!');
  } else if (req.method === 'DELETE') {
    // const clinic = req.body.clinic;
    // await Clinic.findByIdAndDelete(clinic._id);
    // res.send(clinic.clinic + ' Silindi');
  } else if (req.method === 'PUT') {
    // await Clinic.findByIdAndUpdate(req.body.newClinic._id, {
    //   ...req.body.newClinic,
    // });
    // res
    //   .status(200)
    //   .send(
    //     'Klinik ' + req.body.newClinic.clinic + ' düzenlemeler kaydedildi!'
    //   );
  } else res.status(200).json({ name: 'John Doe' });
}
export default connectDB(handler);
