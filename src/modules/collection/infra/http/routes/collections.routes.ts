import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import CollectionController from '../controllers/CollectionController';

const collectionController = new CollectionController();
const collectionRouter = Router();

collectionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      collectionName: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  collectionController.create,
);

collectionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.number().required(),
      email: Joi.string().email().required(),
    },
  }),
  collectionController.create,
);

collectionRouter.get('/search', collectionController.search);

export default collectionRouter;
