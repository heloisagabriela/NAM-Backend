import { date } from '@hapi/joi';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Collection from '../infra/typeorm/entities/Collection';
import ICollectionRepository from '../repositories/ICollectionRepository';

interface IRequest {
  collectionName: string;
  email: string;
}

@injectable()
class CreateCollectionService {
  constructor(
    @inject('CollectionRepository')
    private collectionRepository: ICollectionRepository,
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    collectionName,
    email,
  }: IRequest): Promise<Collection> {
    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist) {
      throw new AppError('User do not exists');
    } else {
      const collection = await this.collectionRepository.create({
        name: collectionName,
        created_by: email,
      });
      return collection;
    }
  }
}

export default CreateCollectionService;
