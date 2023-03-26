import { IAuthor, IArtical, IUser } from '@/types';
import { ObjectId } from 'mongodb';
import mongoose, {
  SchemaDefinitionProperty,
  SchemaTypeOptions,
} from 'mongoose';
var Schema = mongoose.Schema;
const authorSchema = new Schema<IAuthor>({
  articals: [
    {
      _id: ObjectId,
      text: String,
      image: String,
      likes: [
        {
          _id: ObjectId,
          email: String,
          name: String,
          profilePic: String,
        },
      ] as unknown as SchemaDefinitionProperty<IUser[]>,
      publishDate: Date,
    },
  ] as unknown as SchemaDefinitionProperty<IArtical[]>,
});

export default mongoose.models.Author || mongoose.model('Author', authorSchema);
