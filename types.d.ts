import type { ObjectId } from 'mongodb';
import { Post, User } from '@prisma/client';

export interface IArticle {
  _id: ObjectId;
  text: string;
  image: string;
  likes: IUser[];
  publishDate: Date;
}

export interface IAuthor extends IUser {
  articals: IArticle[];
}

export interface IUser {
  _id: ObjectId;
  email: string;
  name: string;
  surname: string;
  password: string;
  image: string;
}
export interface CustomUser {
  at?: string;
  name?: string;
  lastname?: string;
  email?: string;
  register_date?: Date;
  role?: Role;
  profilePic?: string;
}
export interface PostWithUser extends Post {
  user: User;
}
