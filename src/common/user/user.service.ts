import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../../prisma/prisma.service';
import { ValidationService } from '../../validation/validation.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserLoginRequest, UserResponse } from '../../model/user.model';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async register(request: UserLoginRequest): Promise<UserResponse> {
    // Pass the type UserLoginRequest to the validation method
    const registerUser = this.validationService.validation<UserLoginRequest>(
      UserValidation.REGISTER,
      request,
    );
    this.logger.info(`Creating user with username ${registerUser.username}`);
    const existingUser = await this.prismaService.user.count({
      where: {
        username: registerUser.username,
      },
    });
    if (existingUser != 0) {
      throw new HttpException(
        'User already exists with the same username',
        HttpStatus.NOT_FOUND,
      );
    }
    registerUser.password = await bcrypt.hash(registerUser.password, 10);
    await this.prismaService.user.create({
      data: registerUser,
    });
    return {
      username: registerUser.username,
      name: registerUser.username,
    };
  }
}
