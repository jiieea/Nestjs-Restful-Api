import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete, Query,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { Auth } from '../middlewares/auth/auth.decorator';
import * as client from '../../generated/prisma/client';
import {
  ContactResponse,
  CreateContactRequest,
  SearchContactRequest,
  UpdateContactRequest,
} from '../model/contact.model';
import { WebModel } from '../model/web.model';

@Controller('/api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: client.User,
    @Body() request: CreateContactRequest,
  ): Promise<WebModel<ContactResponse>> {
    const result = await this.contactService.create(user, request);
    return {
      data: result,
    };
  }

  @Get('/:contactId')
  @HttpCode(200)
  async get(
    @Auth() user: client.User,
    @Param('contactId', ParseIntPipe) contactId: number,
  ): Promise<WebModel<ContactResponse>> {
    const result = await this.contactService.get(user, contactId);
    return {
      data: result,
    };
    5;
  }

  @Put('/:contactId')
  @HttpCode(200)
  async update(
    @Auth() user: client.User,
    @Body() request: UpdateContactRequest,
    @Param('contactId', ParseIntPipe) contactId: number,
  ): Promise<WebModel<ContactResponse>> {
    request.id = contactId;
    const result = await this.contactService.update(user, request);
    return {
      data: result,
    };
  }

  @Delete('/:contactId')
  @HttpCode(200)
  async delete(
    @Auth() user: client.User,
    @Param('contactId', ParseIntPipe) contactId: number,
  ): Promise<WebModel<boolean>> {
    await this.contactService.delete(user, contactId);
    return {
      data: true,
    };
  }

  @Get()
  @HttpCode(200)
  async search(
    @Auth() user: client.User,
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('phone') phone?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<WebModel<ContactResponse[]>> {
    const request: SearchContactRequest = {
      name: name,
      email: email,
      phone: phone,
      page: page || 1,
      size: size || 10,
    }

    return this.contactService.search(user, request);
  }
}
