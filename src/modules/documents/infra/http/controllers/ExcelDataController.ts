/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-useless-concat */
import CreateCollectionService from '@modules/collection/service/CreateCollectionService';
import GetDocumentDataService from '@modules/documents/services/GetDocumentDataService';
import GetDocumentSchemaService from '@modules/documents/services/GetDocumentSchemaService';
import ImportExcelDataService from '@modules/documents/services/ImportExcelDataService';
import excel from 'exceljs';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

interface IDocProps {
  titulo: string;
  autor: string;
  pasta_documento: string;
  observacoes: string;
  pasta: string;
}

interface IDocSchemaProps {
  column_name: string;
  data_type: string;
}

export default class ExcelDataController {
  async show(request: Request, response: Response) {
    const { collectionId } = request.params;

    const getDocumentDataService = new GetDocumentDataService(collectionId);

    const documentsData = (await getDocumentDataService.execute()) as IDocProps[];

    const getDocumentSchemaService = new GetDocumentSchemaService(collectionId);

    const documentScheema = (await getDocumentSchemaService.execute()) as IDocSchemaProps[];

    const columns = documentScheema
      .map(schema => {
        let header =
          schema.column_name.charAt(0).toUpperCase() +
          schema.column_name.slice(1);
        header = header.replace('_', ' ');

        return {
          header,
          key: schema.column_name,
          width: 25,
        };
      })
      .filter(schema => schema.key !== 'id')
      .filter(schema => schema.key !== 'created_at')
      .filter(schema => schema.key !== 'updated_at');

    const workbook = new excel.Workbook() as any;
    const worksheet = workbook.addWorksheet('Documentos');

    worksheet.columns = columns;

    worksheet.addRows(documentsData);

    const collectionService = container.resolve(CreateCollectionService);

    const collection = await collectionService.getById({ id: collectionId });

    const collectionName = collection?.name.replace(' ', '_').toLowerCase();

    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    response.setHeader(
      'Content-Disposition',
      `attachment; filename=documentos_acervo_${collectionName}.xlsx`,
    );

    return workbook.xlsx.write(response).then(function () {
      response.status(200).end();
    });
  }

  async store(request: Request, response: Response) {
    const { collectionId } = request.params;

    const file = request.file as Express.Multer.File;
    const importExcelDataService = container.resolve(ImportExcelDataService);

    const excelData = importExcelDataService.execute(file, collectionId);
    return response.json(excelData);
  }
}
