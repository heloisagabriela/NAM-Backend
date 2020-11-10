import AppError from '@shared/errors/AppError';
import DocumentsRepository, {
  IDocumentObj,
} from '../infra/typeorm/repositories/DocumentsRepository';

class UpdateDocumentDataService {
  private documentsRepository: DocumentsRepository;

  constructor(collectionId: string) {
    this.documentsRepository = new DocumentsRepository(collectionId);
  }

  public async execute(tableData: IDocumentObj): Promise<object> {
    try {
      return this.documentsRepository.update(tableData);
    } catch {
      throw new AppError(
        'Occorred an error while saving data at the document table',
      );
    }
  }
}

export default UpdateDocumentDataService;
