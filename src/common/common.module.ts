import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { APP_FILTER } from '@nestjs/core';
import { LogMiddleware } from '../middlewares/log/log.middleware';
import { ValidationService } from '../validation/validation.service';
import { UserFilter } from './user/user.filter';
import { AuthMiddleware } from '../middlewares/auth/auth.middleware';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.json(),
      level: 'debug',
      transports: new winston.transports.Console(),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UserController],
  providers: [
    PrismaService,
    ValidationService,
    UserService,
    {
      provide: APP_FILTER,
      useClass: UserFilter,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LogMiddleware).forRoutes({
      path: '/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(AuthMiddleware).forRoutes('/api/*');
  }
}
