import { Connection, createConnection } from 'typeorm';

class CreateConnectionClass {
  public connection: Connection;

  public async getConnection(): Promise<Connection> {
    this.connection = await createConnection();
    return this.connection;
  }
}

const connection = new CreateConnectionClass();

export default connection;
