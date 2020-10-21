import ICreateFileDTO from '../dtos/ICreateFileDTO';
import File from '../infra/typeorm/entities/File';

export default interface IFilesRepository {
  create(data: ICreateFileDTO): Promise<File>;
  createMultiple(data: ICreateFileDTO[]): Promise<File[]>;
  getByDocumentId(document_id: string): Promise<File[] | undefined>;
}
