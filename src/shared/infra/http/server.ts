import 'reflect-metadata';
import 'dotenv/config';

import morgan from 'morgan';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import connection from '@shared/infra/typeorm';
import routes from './routes';

import '@shared/container';

const app = express();

connection.getConnection();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/images', express.static(uploadConfig.directory));
app.use(routes);

app.use(errors());

// app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
//   if (err instanceof AppError) {
//     return response.status(err.statusCode).json({
//       status: 'error',
//       message: err.message,
//     });
//   }

//   return response.status(500).json({
//     status: 'error',
//     message: 'Internal Server Error',
//   });
// });

app.listen(3334, () => {
  console.log('🪐 Server Started on 3334');
});
