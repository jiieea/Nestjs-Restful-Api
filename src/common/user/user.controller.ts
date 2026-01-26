import {
  Controller,
  ParseIntPipe,
  Get,
  Param,
  Query,
  Post,
  Body,
  UsePipes,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserLoginRequest,
  userLoginValidation,
  UserResponse,
} from '../../model/user.model';
import { UserValidationPipe } from '../../validation/validation.pipe';
import { WebModel } from '../../model/web.model';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/users/:id')
  getUser(@Param('id', ParseIntPipe) id: number): string {
    return `get user with id ${id}`;
  }

  @Post('/api/users')
  @HttpCode(200)
  async createUser(
    @Body() request: UserLoginRequest,
  ): Promise<WebModel<UserResponse>> {
    const result = await this.userService.register(request);
    return {
      data: result,
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
