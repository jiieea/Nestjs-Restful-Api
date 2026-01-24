import {
  Controller,
  ParseIntPipe,
  Get,
  Param,
  Query,
  Post,
  Body,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginRequest, userLoginValidation } from '../../model/user.model';
import { UserValidationPipe } from '../../validation/validation.pipe';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/users/:id')
  getUser(@Param('id', ParseIntPipe) id: number): string {
    return `get user with id ${id}`;
  }

  @Post('/create')
  async createUser(
    @Query('username') username: string,
    @Query('password') password: string,
    @Query('name') name: string,
  ) {
    await this.userService.createUser(username, password, name);
    return 'User created successfully';
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
