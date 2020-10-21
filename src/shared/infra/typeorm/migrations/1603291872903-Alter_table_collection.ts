import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTableCollection1603291872903
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'collection',
      new TableColumn({
        name: 'about',
        type: 'text',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'collection',
      new TableColumn({
        name: 'cover_image',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('collection', 'cover_img');
    await queryRunner.dropColumn('collection', 'about');
  }
}
