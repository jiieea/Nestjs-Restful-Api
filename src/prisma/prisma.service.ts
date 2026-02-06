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
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      connectionLimit: 5,
      database: process.env.DATABASE_NAME,
      connectTimeout: 10000,
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
