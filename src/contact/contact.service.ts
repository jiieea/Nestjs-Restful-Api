import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { ContactValidation } from './contact.validation';
import * as client from '../../generated/prisma/client';
import { ContactResponse, CreateContactRequest } from '../model/contact.model';
import { ValidationService } from '../validation/validation.service';
@Injectable()
export class ContactService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(
    user: client.User,
    request: CreateContactRequest,
  ): Promise<ContactResponse> {
    this.logger.debug(
      `Creating new contact: ${JSON.stringify(request)} from ${JSON.stringify(user)}`,
    );
    const createContact: CreateContactRequest =
      this.validationService.validation(ContactValidation.CREATE, request);

    const contact = await this.prismaService.contact.create({
      data: {
        ...createContact,
        ...{ username: user.username },
      },
    });

    return {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      id: contact.id,
    };
  }
}
