import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaClient } from '../../generated/prisma/client';
import { Logger } from 'winston';

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || 'localhost',
  port: 3306,
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'async15',
  connectionLimit: 20,
  database: 'restapi',
});

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {
    super({
      adapter,
    });
  }

  onModuleInit(): any {
    this.logger.info('PrismaService module initialized.');
  }
}
