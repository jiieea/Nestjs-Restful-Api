import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {
    const adapter = new PrismaMariaDb({
      host: process.env.DATABASE_HOST,
      port: 17545,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      connectionLimit: 20,
      database: process.env.DATABASE_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    super({
      adapter,
    });
  }

  onModuleInit(): any {
    this.logger.info(
      `Successfully connected to Aiven at ${process.env.DATABASE_HOST}`,
    );
  }
}
