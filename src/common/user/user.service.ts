import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this.logger.info('User Service constructor');
  }

  async createUser(username: string, password: string, name: string) {
    this.logger.info(`Create user with username ${username}`);
    await this.prismaService.user.create({
      data: {
        username: username,
        password: password,
        name: name,
      },
    });
  }
}
