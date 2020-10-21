interface ITableParams {
  name: string;
  type: 'varchar' | 'text';
}
export interface ITableProps {
  tableColumns: ITableParams[];
}
