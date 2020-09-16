import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
<<<<<<< HEAD
=======
routes.use('/password', passwordRoutter);
routes.use('/profile', profileRouter);

routes.get('/heloisa', (req, res) => {
  return res.json({
    msg: '@heloisagabrielavieira + Unicornio cintilante',
  });
});

routes.get('/pedro', (req, res) => {
  return res.json({
    msg: '@Digite seu nome completo + frase',
  });
});

routes.get('/julia', (req, res) => {
  return res.json({
    msg: '@Digite seu nome completo + frase',
  });
});

routes.get('/felipe', (req, res) => {
  return res.json({
    msg: '@Digite seu nome completo + frase',
  });
});
>>>>>>> fd86d855472ba6ebf671e0f9097c1f83b06a825b
export default routes;
