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
  it('should be able to authenticate', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoew@example.com',
      password: '123456',
    });

    const response = await authtenticateUser.execute({
      email: 'johndoew@example.com',
      password: '123456',
    });

    await expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    expect(
      authtenticateUser.execute({
        email: 'johndoew@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoew@example.com',
      password: '123456',
    });

    await expect(
      authtenticateUser.execute({
        email: 'johndoew@example.com',
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
