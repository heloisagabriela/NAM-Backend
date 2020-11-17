import CreateDocumentDataService from '@modules/documents/services/CreateDocumentDataService';
import GetDocumentDataService from '@modules/documents/services/GetDocumentDataService';
import GetOneDocumentDataService from '@modules/documents/services/GetOneDocumentDataService';
import UpdateDocumentDataService from '@modules/documents/services/UpdateDocumentDataService';

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

  async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { collectionId } = request.params;

    const updateDocumentDataService = new UpdateDocumentDataService(
      collectionId,
    );

    const newDocument = await updateDocumentDataService.execute(data);

    return response.json(newDocument);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { collectionId } = request.params;
    const { documentId } = request.query;

    const getDocumentDataService = new GetOneDocumentDataService(collectionId);

    const documentsData = await getDocumentDataService.execute(
      documentId as string,
    );

    return response.json(documentsData);
  }
}
