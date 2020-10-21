import AppError from '@shared/errors/AppError';
import DocumentsRepository from '../infra/typeorm/repositories/DocumentsRepository';

class GetDocumentDataService {
  private documentsRepository: DocumentsRepository;

  constructor(collectionId: string) {
    this.documentsRepository = new DocumentsRepository(collectionId);
  }

  public async execute(): Promise<object> {
    try {
      const documents = await this.documentsRepository.getAllDocumentData();
      if (!documents) {
        throw new AppError('No document  found');
      }

      return documents;
    } catch {
      throw new AppError('Occorred an error while saving the document schema');
    }
  }
}

export default GetDocumentDataService;
