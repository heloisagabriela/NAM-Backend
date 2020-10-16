import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import collectionRouter from '@modules/collection/infra/http/routes/collections.routes';
import documentsRouter from '@modules/documents/infra/http/routes/documents.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/collection', collectionRouter);
routes.use('/documents', documentsRouter);
export default routes;
