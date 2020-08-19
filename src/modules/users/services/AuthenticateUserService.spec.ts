import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUsersService from './CreateUserService';

describe('AuthenticateUsers', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const authtenticateUser = new AuthenticateUserService(fakeUsersRepository);
    const createUser = new CreateUsersService(fakeUsersRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoew@example.com',
      password: '123456',
    });

    const response = await authtenticateUser.execute({
      email: 'johndoew@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  // it('should not be able to create a new user with the same email from anther one', async () => {
  //   const fakeUsersRepository = new FakeUsersRepository();

  //   const createUser = new CreateUsersService(fakeUsersRepository);

  //   const user = await createUser.execute({
  //     name: 'John Due',
  //     email: 'johndoew@example.com',
  //     password: '123456',
  //   });

  //   expect(
  //     createUser.execute({
  //       name: 'John Due',
  //       email: 'johndoew@example.com',
  //       password: '123456',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
