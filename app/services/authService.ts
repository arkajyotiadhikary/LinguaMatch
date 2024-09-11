import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/userModel';

// create token
export const createToken = (user: IUser): string => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
}

// validate password
export const validatePassowrd = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
}

// register user
export const registerUser = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  return newUser.save();
}

// find user by email
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
}
