import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';

/*
 * Para usar as funções disponibilizadas pelo TypeORM a classe tem que extender Repository:
 * extends Repository<Appointment>
 */
class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const usertToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(usertToken);

    return usertToken;
  }
}
export default UserTokensRepository;
