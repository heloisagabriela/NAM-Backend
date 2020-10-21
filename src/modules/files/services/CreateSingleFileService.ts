import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import File from '../infra/typeorm/entities/File';
import IFilesRepository from '../repositories/IFilesRepository';

interface IRequest {
  path: string;

  document_id: string;
}
@injectable()
class CreateSingleFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,
  ) {}

  public async execute({ document_id, path }: IRequest): Promise<File> {
    const createdFile = await this.filesRepository.create({
      document_id,
      path,
    });

    if (!createdFile) {
      throw new AppError('Ocorred an error while creating the file');
    }

    return createdFile;
  }
}

export default CreateSingleFileService;
