import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '../controllers/UsersController';

const usersController = new UsersController();
const usersRouter = Router();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      registerType: Joi.number().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
