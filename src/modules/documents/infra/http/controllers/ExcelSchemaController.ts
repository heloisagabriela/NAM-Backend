/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-useless-concat */
import CreateCollectionService from '@modules/collection/service/CreateCollectionService';
import GetDocumentSchemaService from '@modules/documents/services/GetDocumentSchemaService';
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

export default class ExcelSchemaController {
  async show(request: Request, response: Response) {
    const { collectionId } = request.params;

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
      .filter(schema => schema.key !== 'id');

    const workbook = new excel.Workbook() as any;
    const worksheet = workbook.addWorksheet('Documentos');

    worksheet.columns = columns;

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
}
