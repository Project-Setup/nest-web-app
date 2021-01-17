import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import next from 'next';
import NextServer from 'next/dist/next-server/server/next-server';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;
  private readonly logger = new Logger(ViewService.name);

  async onModuleInit() {
    this.logger.log('next-telemetry', process.env.NEXT_TELEMETRY_DISABLED);
    try {
      this.server = next({
        dev: process.env.NODE_ENV !== 'production',
        dir: 'src/client',
      });
      await this.server.prepare();
    } catch (error) {
      this.logger.error(error);
    }
  }

  getNextServer() {
    return this.server;
  }
}
