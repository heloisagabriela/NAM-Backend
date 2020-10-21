import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CollectionController from '../controllers/CollectionController';

const collectionController = new CollectionController();
const collectionRouter = Router();
const upload = multer(uploadConfig);

collectionRouter.post('/', upload.single('image'), collectionController.create);

collectionRouter.get('/search', collectionController.search);

export default collectionRouter;
