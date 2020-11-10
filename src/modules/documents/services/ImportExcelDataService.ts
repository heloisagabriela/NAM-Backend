/* eslint-disable no-plusplus */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
import AppError from '@shared/errors/AppError';
import path from 'path';
import xlsx from 'xlsx';

import DocumentsRepository, {
  IDocumentObj,
} from '../infra/typeorm/repositories/DocumentsRepository';

class ImportExcelDataService {
  private documentsRepository: DocumentsRepository;

  constructor() {}

  public execute(excelPath: Express.Multer.File, collectionId: string): any {
    const workbook = xlsx.readFile(excelPath.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    this.documentsRepository = new DocumentsRepository(collectionId);

    const posts = [];
    const post = {};

    const TitleKeys = Object.keys(worksheet).filter(obj => {
      return Number(obj.match(/[\d.]+|\D+/g)[1]) === 1;
    });

    const DataValues = Object.keys(worksheet).filter(obj => {
      return Number(obj.match(/[\d.]+|\D+/g)[1]) !== 1;
    });

    const titles = TitleKeys.map(key => {
      return worksheet[key].v.replace(' ', '_').toLowerCase();
    });

    const values = DataValues.map(key => {
      return worksheet[key].v;
    }).filter(v => v !== undefined);

    let importedData;
    let auxObj;

    for (let i = 0; i < values.length; i++) {
      auxObj[titles[i]] = values[i];
      importedData.push(auxObj);
    }

    return importedData;
  }
}

export default ImportExcelDataService;
