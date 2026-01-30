import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { Auth } from '../middlewares/auth/auth.decorator';
import * as client from '../../generated/prisma/client';
import {
  ContactResponse,
  CreateContactRequest,
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
}
