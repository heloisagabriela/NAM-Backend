import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import File from '../infra/typeorm/entities/File';
import IFilesRepository from '../repositories/IFilesRepository';

interface IRequest {
  filenames: string[];

  document_id: string;
}
@injectable()
class CreateSingleFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,
  ) {}

  public async execute({ filenames, document_id }: IRequest): Promise<File[]> {
    try {
      const files: File[] = filenames.map(path => {
        return {
          path,
          document_id,
        } as File;
      });

      const createdFiles = await this.filesRepository.createMultiple(files);

      return createdFiles;
    } catch {
      throw new AppError('Ocorred an error while saving the file');
    }
  }
}

export default CreateSingleFileService;
