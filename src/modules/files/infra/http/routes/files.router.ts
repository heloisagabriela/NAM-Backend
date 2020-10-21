import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import FileController from '../controllers/FileController';

const filesRouter = Router();
const upload = multer(uploadConfig);
const fileController = new FileController();

filesRouter.post('/:document_id', upload.single('file'), fileController.create);
filesRouter.post(
  '/multiple/:document_id',
  upload.array('files'),
  fileController.createMultipleImages,
);

export default filesRouter;
