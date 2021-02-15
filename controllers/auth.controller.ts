import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/user.model';
import validation from './validation';
const { registerValidation, loginValidation } = validation;

class AuthCtrl {
  async newUser(req: any, res: express.Response): Promise<void> {
    //data validation
    const { error } = registerValidation(req.body);
    if (error) res.status(400).json(error.details[0].message);

    const { username, password, name } = req.body;

    try {
      //find if username exists in db
      const candidate = await User.findOne({ username });
      if (candidate) {
        res.status(400).json({ message: 'User with this username exists' });
      }

      //hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      //create new user
      const newUser = new User({ username, password: hashedPassword, name });
      await newUser.save();
      res.status(201).json('New user created!');
    } catch (err) {
      res.status(400).json('Something get wrong, try again');
    }
  }

  async login(req: any, res: express.Response): Promise<void> {
    //data validation
    const { error } = loginValidation(req.body);
    if (error) res.status(400).json(error.details[0].message);

    const { username, password } = req.body;

    try {
      //find same username
      const user: any = await User.findOne({ username });
      if (!user) {
        res.status(400).json('Wrong username or password');
      }

      //check password
      const validPass = bcrypt.compare(password, user.password);
      if (!validPass) res.status(400).json('Invalid password');

      //create and assign a token
      const token = jwt.sign(
        { _id: user._id },
        process.env.SECRET_KEY || '151515'
      );
      res.header('auth-token', token).json(token);
    } catch (err) {
      res.status(400).json('Something get wrong, try again');
    }
  }
}

export const AuthController = new AuthCtrl();
