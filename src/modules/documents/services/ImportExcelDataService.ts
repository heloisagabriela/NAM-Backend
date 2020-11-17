/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
import AppError from '@shared/errors/AppError';
import xlsx from 'xlsx';

import DocumentsRepository from '../infra/typeorm/repositories/DocumentsRepository';

class ImportExcelDataService {
  private documentsRepository: DocumentsRepository;

  public execute(excelPath: Express.Multer.File, collectionId: string): any {
    const workbook = xlsx.readFile(excelPath.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    this.documentsRepository = new DocumentsRepository(collectionId);

    const TitleKeys = Object.keys(worksheet).filter(obj => {
      return Number(obj.match(/[\d.]+|\D+/g)[1]) === 1;
    });

    const titles = TitleKeys.map(key => {
      return worksheet[key].v.replace(' ', '_').toLowerCase();
    });

    const dataValues = Object.values(worksheet).map(obj => {
      return obj.v;
    });

    const dataValuesWithoutTitles = dataValues
      .splice(titles.length + 1, dataValues.length)
      .filter(n => n !== null);

    const convertedArrayToDocumentStructure = [];

    for (let i = 0; i < dataValuesWithoutTitles.length; i += titles.length) {
      convertedArrayToDocumentStructure.push(
        dataValuesWithoutTitles.slice(i, i + titles.length),
      );
    }

    const documentsObjectArray = convertedArrayToDocumentStructure.map(arr =>
      this.ConvertArrayToObject(titles, arr),
    );

    const convertedDocumentsObjectArray = documentsObjectArray.splice(
      0,
      documentsObjectArray.length - 1,
    );

    try {
      convertedDocumentsObjectArray.forEach(async documentObject => {
        return this.documentsRepository.store(documentObject);
      });
    } catch {
      throw new AppError('Ocorred an Error while importing excel');
    }

    return convertedDocumentsObjectArray;
  }

  private ConvertArrayToObject(
    titles: any[],
    columns: any[],
    convertedObject = {},
  ): any {
    titles.map((val, idx) => {
      convertedObject[val] = columns[idx];
    });
    return convertedObject;
  }
}

export default ImportExcelDataService;
