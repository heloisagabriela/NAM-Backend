import CreateDocumentDataService from '@modules/documents/services/CreateDocumentDataService';
import { Request, Response } from 'express';

export default class DocumentsDataController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { collectionId } = request.params;
    const createDocumentDataService = new CreateDocumentDataService(
      collectionId,
    );

    const documentScheema = await createDocumentDataService.execute(data);

    return response.json(documentScheema);
  }
}
