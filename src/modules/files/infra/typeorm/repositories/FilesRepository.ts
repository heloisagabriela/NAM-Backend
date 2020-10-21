import ICreateFileDTO from '@modules/files/dtos/ICreateFileDTO';
import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import { getRepository, Repository } from 'typeorm';
import File from '../entities/File';

class FilesRepository implements IFilesRepository {
  private ormRepository: Repository<File>;

  constructor() {
    this.ormRepository = getRepository(File);
  }

  public async create(data: ICreateFileDTO): Promise<File> {
    const file = this.ormRepository.create(data);

    await this.ormRepository.save(file);

    return file;
  }

  public async createMultiple(data: ICreateFileDTO[]): Promise<File[]> {
    const files = this.ormRepository.create(data);

    await this.ormRepository.save(files);

    return files;
  }

  public async getByDocumentId(
    document_id: string,
  ): Promise<File[] | undefined> {
    return this.ormRepository.find({
      where: { document_id },
    });
  }
}
export default FilesRepository;
