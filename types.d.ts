import type { ObjectId } from 'mongodb';
export interface IArtical {
  _id: ObjectId;
  text: string;
  image: string;
  likes: IUser[];
  publishDate: Date;
}

export interface IAuthor extends IUser {
  articals: IArtical[];
}

export interface IUser {
  _id: ObjectId;
  email: string;
  name: string;
  surname: string;
  password: string;
  image: string;
}
