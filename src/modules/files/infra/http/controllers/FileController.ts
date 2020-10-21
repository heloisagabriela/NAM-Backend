import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSingleFileService from '../../../services/CreateSingleFileService';
import CreateMultipleFilesService from '../../../services/CreateMultipleFilesService';

export default class FileController {
  async create(request: Request, response: Response): Promise<Response> {
    const { document_id } = request.params;
    const { filename: path } = request.file;

    const createSingleFileService = container.resolve(CreateSingleFileService);

    const file = await createSingleFileService.execute({
      document_id,
      path,
    });

    return response.json(file);
  }

  async createMultipleImages(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { document_id } = request.params;
    const requestFiles = request.files as Express.Multer.File[];

    const filenames = requestFiles.map(files => files.filename);

    const createMultipleFilesService = container.resolve(
      CreateMultipleFilesService,
    );

    const files = await createMultipleFilesService.execute({
      document_id,
      filenames,
    });

    return response.status(201).json(files);
  }
}
