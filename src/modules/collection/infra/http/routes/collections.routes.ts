import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/midddlewares/ensureAuthenticated';
import CollectionController from '../controllers/CollectionController';

const collectionController = new CollectionController();
const collectionRouter = Router();
const upload = multer(uploadConfig);

collectionRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('image'),
  collectionController.create,
);

collectionRouter.get('/', ensureAuthenticated, collectionController.search);

collectionRouter.get('/:id', ensureAuthenticated, collectionController.show);

export default collectionRouter;
