import {
  Controller,
  ParseIntPipe,
  Get,
  Param,
  Query,
  Post,
  Body,
  UsePipes,
  Delete,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as client from '@prisma/client';
import {
  UserLoginRequest,
  userLoginValidation,
  UserRegisterRequest,
  UserResponse,
  UserUpdateRequest,
} from '../../model/user.model';
import { UserValidationPipe } from '../../validation/validation.pipe';
import { WebModel } from '../../model/web.model';
import { Auth } from '../../middlewares/auth/auth.decorator';
@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/users/:id')
  getUser(@Param('id', ParseIntPipe) id: number): string {
    return `get user with id ${id}`;
  }

  @Get()
  greeting() {
    return 'Hello World';
  }

  @Post()
  @HttpCode(200)
  async createUser(
    @Body() request: UserRegisterRequest,
  ): Promise<WebModel<UserResponse>> {
    const result = await this.userService.register(request);
    return {
      data: result,
    };
  }
  @Get('/current')
  @HttpCode(200)
  async get(@Auth() user: client.User): Promise<WebModel<UserResponse>> {
    const result = await this.userService.get(user);
    return {
      data: result,
    };
  }

  @Post('/login')
  @HttpCode(200)
  async loginUser(
    @Body() request: UserLoginRequest,
  ): Promise<WebModel<UserResponse>> {
    const result = await this.userService.login(request);
    return {
      data: result,
    };
  }
  @Patch('/current')
  @HttpCode(200)
  async update(
    @Auth() user: client.User,
    @Body() request: UserUpdateRequest,
  ): Promise<WebModel<UserResponse>> {
    const result = await this.userService.update(user, request);
    return {
      data: result,
    };
  }
  @Delete('/current')
  @HttpCode(200)
  async delete(@Auth() user: client.User): Promise<WebModel<boolean>> {
    await this.userService.delete(user);
    return {
      data: true,
    };
  }

  @UsePipes(new UserValidationPipe(userLoginValidation))
  @Post('/login')
  login(
    @Query('user') user: string,
    @Body()
    request: UserLoginRequest,
  ) {
    return {
      username: request.username,
      password: request.password,
    };
  }
}
