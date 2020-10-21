import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ICollectionRepository from '@modules/collection/repositories/ICollectionRepository';
import CollectionRepository from '@modules/collection/infra/typeorm/repositories/CollectionRepository';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import FilesRepository from '@modules/files/infra/typeorm/repositories/FilesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICollectionRepository>(
  'CollectionRepository',
  CollectionRepository,
);

container.registerSingleton<IFilesRepository>(
  'FilesRepository',
  FilesRepository,
);
