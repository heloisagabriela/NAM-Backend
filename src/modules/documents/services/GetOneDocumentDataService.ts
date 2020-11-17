import AppError from '@shared/errors/AppError';
import DocumentsRepository from '../infra/typeorm/repositories/DocumentsRepository';

class GetOneDocumentDataService {
  private documentsRepository: DocumentsRepository;

  constructor(collectionId: string) {
    this.documentsRepository = new DocumentsRepository(collectionId);
  }

  public async execute(documentId: string): Promise<object> {
    try {
      const document = await this.documentsRepository.getOneDocumentData(
        documentId,
      );
      if (!document) {
        throw new AppError('No document  found');
      }

      return document;
    } catch {
      throw new AppError('Occorred an error while saving the document schema');
    }
  }
}

export default GetOneDocumentDataService;
