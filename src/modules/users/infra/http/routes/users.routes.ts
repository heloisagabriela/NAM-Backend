import { Router } from 'express';
import uploadConfig from '@config/upload';

import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../../midddlewares/ensureAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
