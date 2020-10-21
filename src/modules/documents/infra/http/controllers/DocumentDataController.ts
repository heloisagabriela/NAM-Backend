import CreateDocumentDataService from '@modules/documents/services/CreateDocumentDataService';
import GetDocumentDataService from '@modules/documents/services/GetDocumentDataService';

import { Request, Response } from 'express';

export default class DocumentsDataController {
  async index(request: Request, response: Response): Promise<Response> {
    const { collectionId } = request.params;

    const getDocumentDataService = new GetDocumentDataService(collectionId);

    const documentsData = await getDocumentDataService.execute();

    return response.json(documentsData);
  }

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
