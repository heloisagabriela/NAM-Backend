import { ITableProps } from '@modules/documents/dtos/ICreateTableDTO';
import AppError from '@shared/errors/AppError';
import databaseConnection from '@shared/infra/typeorm';
import { EntityManager, Table, QueryRunner } from 'typeorm';

export interface ICreateTableResponse {
  status: number;
  message: string;
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
    }
  }

  public async getDocumentTableStructure(): Promise<object | undefined> {
    const documentTableStructure = await this.entityManager.query(`
      SELECT
          column_name,
          data_type
      FROM
          information_schema.columns
      WHERE
          table_name = '${this.tableName}';
      `);

    return documentTableStructure;
  }
}
export default DocumentsRepository;
