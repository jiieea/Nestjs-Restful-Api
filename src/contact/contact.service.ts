import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { ContactValidation } from './contact.validation';
import * as client from '../../generated/prisma/client';
import {
  ContactResponse,
  CreateContactRequest,
  UpdateContactRequest,
} from '../model/contact.model';
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

    return this.toContactResponse(contact);
  }

  toContactResponse(contact: ContactResponse): ContactResponse {
    return {
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      id: contact.id,
    };
  }

  async checkContactToBeExist(
    username: string,
    contactId: number,
  ): Promise<ContactResponse> {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        username: username,
        id: contactId,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }
    return contact;
  }

  async get(user: client.User, contactId: number): Promise<ContactResponse> {
    const contact = await this.checkContactToBeExist(user.username, contactId);
    return this.toContactResponse(contact);
  }

  async update(
    user: client.User,
    request: UpdateContactRequest,
  ): Promise<ContactResponse> {
    const contactUpdate = this.validationService.validation(
      ContactValidation.UPDATE,
      request,
    );
    await this.checkContactToBeExist(user.username, contactUpdate.id);
    const updateContact = await this.prismaService.contact.update({
      where: {
        id: contactUpdate.id,
        username: user.username,
      },
      data: contactUpdate,
    });

    return this.toContactResponse(updateContact);
  }

  async delete(user: client.User, contactId: number): Promise<ContactResponse> {
    await this.checkContactToBeExist(user.username, contactId);
    const deleteContact = await this.prismaService.contact.delete({
      where: {
        id: contactId,
        username: user.username,
      },
    });

    return this.toContactResponse(deleteContact);
  }
}
