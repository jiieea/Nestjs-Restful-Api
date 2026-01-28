import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Auth } from '../middlewares/auth/auth.decorator';
import * as client from '../../generated/prisma/client';
import { ContactResponse, CreateContactRequest } from '../model/contact.model';
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
}
