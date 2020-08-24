import IMailTemplateProvider from '../model/IMailTemplateProvider';

export default class FakeTemplateMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail Content';
  }
}
