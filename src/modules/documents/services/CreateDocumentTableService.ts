import AppError from '@shared/errors/AppError';
import { ITableProps } from '../dtos/ICreateTableDTO';
import DocumentsRepository from '../infra/typeorm/repositories/DocumentsRepository';

class CreateDocumentTableService {
  private documentsRepository: DocumentsRepository;

  constructor(collectionId: string) {
    this.documentsRepository = new DocumentsRepository(collectionId);
  }

  public async execute({ tableColumns }: ITableProps): Promise<object> {
    try {
      const tableSchema = await this.documentsRepository.createTable({
        tableColumns,
      });

      return tableSchema;
    } catch {
      throw new AppError('Occorred an error while saving the document schema');
    }
  }
}

export default CreateDocumentTableService;
