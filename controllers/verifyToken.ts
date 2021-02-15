import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function (req, res) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json('Access denied');

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    res.status(400).json('Invalid token');
  }
}
