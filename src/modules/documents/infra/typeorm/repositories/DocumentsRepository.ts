import { ITableProps } from '@modules/documents/dtos/ICreateTableDTO';
import AppError from '@shared/errors/AppError';
import databaseConnection from '@shared/infra/typeorm';
import { EntityManager, Table, QueryRunner } from 'typeorm';

export interface ICreateTableResponse {
  status: number;
  message: string;
}

export interface IDocumentObj {
  id: string;
}

interface DocumentTableStructure {
  column_name: string;
  data_type: string;
}

class DocumentsRepository {
  private queryRunner: QueryRunner;

  private entityManager: EntityManager;

  private tableName: string;

  private collectionId: string;

  constructor(collectionId: string) {
    this.queryRunner = databaseConnection.connection.createQueryRunner();
    this.entityManager = new EntityManager(
      databaseConnection.connection,
      this.queryRunner,
    );
    this.collectionId = collectionId;
    this.tableName = `obras_acervo_${this.collectionId}`;
  }

  public async createTable(data: ITableProps): Promise<ICreateTableResponse> {
    await this.queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          ...data.tableColumns,
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await this.queryRunner.release();
    return {
      status: 200,
      message: this.tableName,
    };
  }

  public async store(data: object): Promise<object> {
    try {
      const query = `INSERT INTO "${this.tableName}" (${Object.keys(
        data,
      )}) VALUES (${Object.values(data).map(o => {
        return `'${o}'`;
      })})`;

      await this.entityManager.query(query);
      return data;
    } catch {
      throw new AppError('Ocorred an Error While inserting document data');
    } finally {
      await this.entityManager.release();
    }
  }

  public async update(data: IDocumentObj): Promise<object> {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const keyValue = keys.map((key, i) => {
      return `${key} = '${values[i]}'`;
    });

    try {
      const query = `UPDATE "${this.tableName}" SET ${keyValue} WHERE id = '${data.id}'  `;

      await this.entityManager.query(query);
      return data;
    } catch {
      throw new AppError('Ocorred an Error While inserting document data');
    } finally {
      await this.entityManager.release();
    }
  }

  public async getDocumentTableStructure(): Promise<
    DocumentTableStructure[] | undefined
  > {
    const documentTableStructure = await this.entityManager.query(`
      SELECT
          column_name,
          data_type
      FROM
          information_schema.columns
      WHERE
          table_name = '${this.tableName}';
      `);

    await this.entityManager.release();
    return documentTableStructure;
  }

  public async getAllDocumentData(): Promise<object | undefined> {
    const document = await this.entityManager.query(
      `SELECT * FROM public."${this.tableName}"`,
    );

    await this.entityManager.release();
    return document;
  }
}
export default DocumentsRepository;
