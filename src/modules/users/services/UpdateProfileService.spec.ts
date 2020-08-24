import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('Update Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndoew@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'tre@exemple.com',
    });

    expect(updatedUser.name).toBe('John Tre');
  });
  it('should not be able to update profile from a non existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'John Tre',
        email: 'tre@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to change the email to an existing one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'teste@example.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndoe@exemple.com',
      password: '123456',
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johndoe@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndue@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johndoe@exemple.com',
      old_password: '123456',
      password: '123123',
    });

    await expect(updatedUser.password).toBe('123123');
  });

  it('should be not able to change update the password without old Password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndue@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johndoe@exemple.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be not able to change update the password wrong Password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndue@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johndoe@exemple.com',
        password: '123123',
        old_password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
