import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUserService';

describe('CreateUsers', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUsersService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John Due',
      email: 'johndoew@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email from anther one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUsersService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John Due',
      email: 'johndoew@example.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'John Due',
        email: 'johndoew@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
