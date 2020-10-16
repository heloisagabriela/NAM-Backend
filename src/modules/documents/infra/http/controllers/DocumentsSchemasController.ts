import CreateDocumentTableService from '@modules/documents/services/CreateDocumentTableService';
import GetDocumentSchemaService from '@modules/documents/services/GetDocumentSchemaService';
import { Request, Response } from 'express';

export default class DocumentsSchemaController {
  async create(request: Request, response: Response): Promise<Response> {
    const { tableColumns, collectionId } = request.body;

    const createDocumentTableService = new CreateDocumentTableService(
      collectionId,
    );

    const documentScheema = await createDocumentTableService.execute({
      tableColumns,
    });

    return response.json(documentScheema);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { collectionId } = request.params;

    const getDocumentSchemaService = new GetDocumentSchemaService(collectionId);

    const documentScheema = await getDocumentSchemaService.execute();

    return response.json(documentScheema);
  }
}
