import express from 'express';
const router = express.Router();

import { AuthController } from '../controllers/auth.controller';

router.post('/register', AuthController.newUser);

router.post('/login', AuthController.login);

export default router;
