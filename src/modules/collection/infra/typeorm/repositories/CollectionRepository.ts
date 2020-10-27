import { getRepository, Repository } from 'typeorm';

import ICollectionRepository from '@modules/collection/repositories/ICollectionRepository';
import ICreateCollectionDTO from '@modules/collection/dtos/ICreateCollectionDTO';
import Collection from '../entities/Collection';

class CollectionRepository implements ICollectionRepository {
  private ormRepository: Repository<Collection>;

  constructor() {
    this.ormRepository = getRepository(Collection);
  }

  public async create(
    collectionData: ICreateCollectionDTO,
  ): Promise<Collection> {
    const collection = this.ormRepository.create({
      name: collectionData.nomeDoAcervo,
      created_by: collectionData.emailUsuario,
      cover_image: collectionData.cover_image,
      about: collectionData.about,
    });

    await this.ormRepository.save(collection);
    return collection;
  }

  public async search(): Promise<Collection[]> {
    const collections = this.ormRepository.find({ where: { active: 1 } });

    return collections;
  }

  public async getById(id: string): Promise<Collection | undefined> {
    const collection = this.ormRepository.findOne(id);

    return collection;
  }
}
export default CollectionRepository;
