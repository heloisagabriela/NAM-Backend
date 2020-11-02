import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/midddlewares/ensureAuthenticated';
import DocumentsDataController from '../controllers/DocumentDataController';
// import { celebrate, Segments, Joi } from 'celebrate';
import DocumentsSchemaController from '../controllers/DocumentsSchemasController';
import ExcelDataController from '../controllers/ExcelDataController';
import ExcelSchemaController from '../controllers/ExcelSchemaController';

const documentsSchemaController = new DocumentsSchemaController();
const documentsDataController = new DocumentsDataController();
const excelDataController = new ExcelDataController();
const excelSchemaController = new ExcelSchemaController();
const documentsRouter = Router();

documentsRouter.get(
  '/structure/:collectionId',
  ensureAuthenticated,
  documentsSchemaController.show,
);

documentsRouter.post(
  '/structure/',
  ensureAuthenticated,
  documentsSchemaController.create,
);

documentsRouter.get(
  '/structure/excel/:collectionId',
  excelSchemaController.show,
);

documentsRouter.post(
  '/data/:collectionId',
  ensureAuthenticated,
  documentsDataController.create,
);

documentsRouter.get(
  '/data/:collectionId',
  ensureAuthenticated,
  documentsDataController.index,
);

documentsRouter.get('/data/excel/:collectionId', excelDataController.show);

export default documentsRouter;
