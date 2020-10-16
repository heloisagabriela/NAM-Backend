interface IDocumentMinimalProps {
  title: string;
  authorName: string;
}
export default interface ICreateDocumentDTO {
  data: IDocumentMinimalProps[];
}
