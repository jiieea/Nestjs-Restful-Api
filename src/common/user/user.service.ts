import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../../prisma/prisma.service';
import { ValidationService } from '../../validation/validation.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  UserLoginRequest,
  UserRegisterRequest,
  UserResponse,
  UserUpdateRequest,
} from '../../model/user.model';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import * as client from '../../../generated/prisma';
@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async register(request: UserRegisterRequest): Promise<UserResponse> {
    // Pass the type UserLoginRequest to the validation method
    const registerUser: UserRegisterRequest =
      this.validationService.validation<UserRegisterRequest>(
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
    const user = await this.prismaService.user.create({
      data: registerUser,
    });
    return {
      username: user.username,
      name: user.username,
    };
  }

  async login(request: UserLoginRequest): Promise<UserResponse> {
    this.logger.info(`UserService.login(${JSON.stringify(request)})`);
    const loginUser: UserLoginRequest = this.validationService.validation(
      UserValidation.LOGIN,
      request,
    );
    let existingUser = await this.prismaService.user.findUnique({
      where: {
        username: loginUser.username,
      },
    });

    if (!existingUser) {
      throw new HttpException(`Username or Password invalid`, 401);
    }
    const password = await bcrypt.compare(
      loginUser.password,
      existingUser.password,
    );
    if (!password) {
      throw new HttpException(`Password invalid`, 401);
    }
    existingUser = await this.prismaService.user.update({
      where: {
        username: loginUser.username,
      },
      data: {
        token: uuid(),
      },
    });

    return {
      username: existingUser.username,
      name: existingUser.name,
      token: existingUser.token,
    };
  }

  async get(user: client.User): Promise<UserResponse> {
    return {
      username: user.username,
      name: user.name,
    };
  }
  async update(
    user: client.User,
    request: UserUpdateRequest,
  ): Promise<UserResponse> {
    this.logger.debug(
      `UserService.update(${JSON.stringify(user)} , ${JSON.stringify(request)})`,
    );
    const updateUserValidation = this.validationService.validation(
      UserValidation.UPDATE,
      request,
    );
    if (updateUserValidation.name) {
      user.name = updateUserValidation.name;
    }
    if (updateUserValidation.password) {
      user.password = await bcrypt.hash(updateUserValidation.password, 10);
    }
    const updateUser = await this.prismaService.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });

    return {
      name: updateUser.name,
      username: updateUser.username,
    };
  }
  async delete(user: client.User): Promise<UserResponse> {
    const result = await this.prismaService.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });
    return {
      username: result.username,
      name: result.name,
    };
  }
}
