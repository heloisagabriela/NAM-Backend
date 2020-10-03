import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import Collection from '../entities/Collection';
import ICreateCollectionDTO from '@modules/collection/dtos/ICreateCollectionDTO';

class CollectionRepository implements ICollectionRepository {
  private ormRepository: Repository<Collection>;

  constructor() {
    this.ormRepository = getRepository(Collection);
  }
  public async create(collectionData: ICreateCollectionDTO): Promise<Collection> {
    const collection = this.ormRepository.create(collectionData);

    await this.ormRepository.save(collectionData);
    return collection;
  }
}
export default CollectionRepository;
