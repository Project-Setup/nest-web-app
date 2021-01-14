import { Connection, QueryRunner } from 'typeorm';

class QueryRunnerFactory {
  private readonly queryRunner: QueryRunner;
  constructor(connection: Connection) {
    this.queryRunner = connection.createQueryRunner();
    this.queryRunner.connect();
  }

  async getTransactionManager() {
    await this.queryRunner.startTransaction();
    return this.queryRunner.manager;
  }

  async commitTransaction() {
    try {
      await this.queryRunner.commitTransaction();
    } catch (err) {
      await this.queryRunner.rollbackTransaction();
    }
  }

  async release() {
    await this.queryRunner.release();
  }
}

export default QueryRunnerFactory;
