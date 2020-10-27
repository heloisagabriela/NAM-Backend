import ICreateCollectionDTO from '../dtos/ICreateCollectionDTO';
import Collection from '../infra/typeorm/entities/Collection';

export default interface ICollectionRepository {
  create(data: ICreateCollectionDTO): Promise<Collection>;
  search(): Promise<Collection[]>;
  getById(id: string): Promise<Collection | undefined>;
}
