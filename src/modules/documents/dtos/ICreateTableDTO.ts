interface ITableParams {
  name: string;
  type: 'varchar';
}
export interface ITableProps {
  tableColumns: ITableParams[];
}
