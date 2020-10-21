import CreateCollectionService from '@modules/collection/service/CreateCollectionService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CollectionController {
  async create(request: Request, response: Response): Promise<Response> {
    const collectionService = container.resolve(CreateCollectionService);
    const { collectionName, email, about } = request.body;
    const { filename } = request.file;
    const collection = await collectionService.execute({
      collectionName,
      email,
      cover_image: filename,
      about,
    });

    return response.json(collection);
  }

  async search(_: Request, response: Response): Promise<Response> {
    const collectionService = container.resolve(CreateCollectionService);

    const collections = await collectionService.search();

    return response.json(collections);
  }
}
