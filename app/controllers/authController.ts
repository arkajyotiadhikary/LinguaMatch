import { NextApiRequest, NextApiResponse } from 'next';
import { createToken, findUserByEmail, registerUser, validatePassowrd } from '../services/authService';


export const register = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: 'Credentials does not exist.' })
  try {
    const userExist = await findUserByEmail(email);
    if (userExist) return res.status(400).json({ message: 'User already exist.' });

    const newUser = await registerUser(username, email, password);
    const token = createToken(newUser);

    res.status(201).json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

export const login = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'Credentials doest not exist.' });

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

    const isPasswordValid = await validatePassowrd(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = createToken(user);

    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


