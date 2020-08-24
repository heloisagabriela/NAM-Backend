// import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndoew@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoew@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password from a non exiting user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoew@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndoew@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoew@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
