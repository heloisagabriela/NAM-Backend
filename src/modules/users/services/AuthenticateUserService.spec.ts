import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUsersService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authtenticateUser: AuthenticateUserService;
let createUser: CreateUsersService;
describe('AuthenticateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authtenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUser = new CreateUsersService(fakeUsersRepository, fakeHashProvider);
  });

  it('should not be able to authenticate with non existing user', async () => {
    expect(
      authtenticateUser.execute({
        username: 'johDoe2',
        password: '123456',
        registerType: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoew@example.com',
      username: 'johDoe2',
      password: '123456',
      registerType: 1,
    });

    await expect(
      authtenticateUser.execute({
        username: 'johDoe2',
        password: 'wrongPassword',
        registerType: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

it('should not be able to authenticate with wrong password', async () => {
  await createUser.execute({
    name: 'John Doe',
    email: 'johndoe222w@example.com',
    username: 'johDoe22',
    password: '123456',
    registerType: 1,
  });

  await expect(
    authtenticateUser.execute({
      username: 'johDoe2',
      password: '123456',
      registerType: 999,
    }),
  ).rejects.toBeInstanceOf(AppError);
});
