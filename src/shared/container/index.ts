import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ICollectionRepository from '@modules/collection/repositories/ICollectionRepository';
import CollectionRepository from '@modules/collection/infra/typeorm/repositories/CollectionRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICollectionRepository>(
  'CollectionRepository',
  CollectionRepository,
);
