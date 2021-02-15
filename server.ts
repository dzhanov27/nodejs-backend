import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUI = require('swagger-ui-express');

import authRouter from './routes/auth_routes';
import cafesRouter from './routes/cafes_routes';
import orderRouter from './routes/order_routes';

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: 'EasyWay API',
//       version: '1.0.0',
//     },
//   },
//   apis: ['server.js'],
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
const PORT = process.env.PORT || 5000;
const uri: any = process.env.MONGODB_URI;

//middleares
app.use(cors());
app.use(express.json());

//swagger route
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// //route middlewares
app.use('/api/auth', authRouter);
app.use('/api/cafes', cafesRouter);
app.use('/api/order', orderRouter);

//server and db
async function start() {
  try {
    await mongoose.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      () => {
        console.log('Connected to DB!');
      }
    );

    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}`)
    );
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();

/**
 * @swagger
 * /api/cafes:
 *   get:
 *     description: Get all cafes
 *     responses:
 *       200:
 *         description: Success
 *
 * @swagger
 * /api/cafes:
 *   post:
 *     description: Create new cafe
 *     parameters:
 *      - name: name
 *        in: formData
 *        required: true
 *        type: string
 *      - name: address
 *        in: formData
 *        required: true
 *        type: string
 *      - name: phone
 *        in: formData
 *        required: true
 *        type: string
 *      - name: description
 *        in: formData
 *        type: string
 *
 *
 */
