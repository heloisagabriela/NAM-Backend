import AppError from '@shared/errors/AppError';
import DocumentsRepository from '../infra/typeorm/repositories/DocumentsRepository';

class GetDocumentSchemaService {
  private documentsRepository: DocumentsRepository;

  constructor(collectionId: string) {
    this.documentsRepository = new DocumentsRepository(collectionId);
  }

  public async execute(): Promise<object> {
    try {
      const tableSchema = await this.documentsRepository.getDocumentTableStructure();

      if (!tableSchema) {
        throw new AppError('Document Scheema not found');
      }

      return tableSchema;
    } catch {
      throw new AppError('Occorred an error while saving the document schema');
    }
  }
}

export default GetDocumentSchemaService;
