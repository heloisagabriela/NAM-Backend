import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Collection from '../infra/typeorm/entities/Collection';
import ICollectionRepository from '../repositories/ICollectionRepository';

interface IRequest {
  collectionName: string;
  email: string;
  about: string;
  cover_image: string;
}

@injectable()
class CreateCollectionService {
  constructor(
    @inject('CollectionRepository')
    private collectionRepository: ICollectionRepository,
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    collectionName,
    email,
    about,
    cover_image,
  }: IRequest): Promise<Collection> {
    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist) {
      throw new AppError('User do not exists');
    } else {
      const collection = await this.collectionRepository.create({
        nomeDoAcervo: collectionName,
        emailUsuario: email,
        about,
        cover_image,
      });
      return collection;
    }
  }

  public async search(): Promise<Collection[]> {
    return this.collectionRepository.search();
  }
}

export default CreateCollectionService;
