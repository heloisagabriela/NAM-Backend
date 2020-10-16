import AppError from '@shared/errors/AppError';
import DocumentsRepository from '../infra/typeorm/repositories/DocumentsRepository';

class CreateDocumentDataService {
  private documentsRepository: DocumentsRepository;

  constructor(collectionId: string) {
    this.documentsRepository = new DocumentsRepository(collectionId);
  }

  public async execute(tableData: object): Promise<object> {
    try {
      return this.documentsRepository.store(tableData);
    } catch {
      throw new AppError(
        'Occorred an error while saving data at the document schema',
      );
    }
  }
}

export default CreateDocumentDataService;
