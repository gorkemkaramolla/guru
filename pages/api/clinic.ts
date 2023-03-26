import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../middleware/mongodb';
import Clinic from '../../model/user.model';
import { ObjectId } from 'mongodb';

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
    const clinics = await Clinic.find({});
    res.status(201).json(clinics);
  } else if (req.method === 'POST') {
    const formData = req.body.formData;
    formData._id = new ObjectId();

    const clinic = await new Clinic(formData);
    await clinic.save();
    res.status(200).send('Klinik eklendi!');
  } else if (req.method === 'DELETE') {
    const clinic = req.body.clinic;
    await Clinic.findByIdAndDelete(clinic._id);
    res.send(clinic.clinic + ' Silindi');
  } else if (req.method === 'PUT') {
    await Clinic.findByIdAndUpdate(req.body.newClinic._id, {
      ...req.body.newClinic,
    });
    res
      .status(200)
      .send(
        'Klinik ' + req.body.newClinic.clinic + ' düzenlemeler kaydedildi!'
      );
  } else res.status(200).json({ name: 'John Doe' });
}
export default connectDB(handler);
