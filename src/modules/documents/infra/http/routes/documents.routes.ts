import { Router } from 'express';
import DocumentsDataController from '../controllers/DocumentDataController';
// import { celebrate, Segments, Joi } from 'celebrate';
import DocumentsSchemaController from '../controllers/DocumentsSchemasController';

const documentsSchemaController = new DocumentsSchemaController();
const documentsDataController = new DocumentsDataController();

const documentsRouter = Router();

documentsRouter.get('/structure/:collectionId', documentsSchemaController.show);

documentsRouter.post('/structure/', documentsSchemaController.create);

documentsRouter.post('/data/:collectionId', documentsDataController.create);

documentsRouter.get('/data/:collectionId', documentsDataController.index);

export default documentsRouter;
