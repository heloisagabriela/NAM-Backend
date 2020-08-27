import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRoutter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRoutter);
routes.use('/profile', profileRouter);

routes.get('/heloisa', (req, res) => {
  return res.json({
    msg: '@Digite seu nome completo + frase',
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
export default routes;
