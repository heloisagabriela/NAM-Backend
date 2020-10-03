import CreateCollectionService from '@modules/collection/service/CreateCollectionService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CollectionController {
  async create(request: Request, response: Response): Promise<Response> {
    const collectionService = container.resolve(CreateCollectionService);
    const { collectionName, email } = request.body;

    const collection = await  collectionService.execute({
      collectionName,
      email
    });

    return response.json(collection);
  }
}