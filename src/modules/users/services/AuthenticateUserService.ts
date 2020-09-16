import { Secret, sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  username: string;
  password: string;
  registerType: number;
}
interface IResponse {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository') private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    username,
    password,
    registerType,
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new AppError('Invalid Login', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Invalid Login', 401);
    }

    if (user.registerType !== registerType) {
      throw new AppError('Registertype not matched', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret as Secret, {
      subject: String(user.id),
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
