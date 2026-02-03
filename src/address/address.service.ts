import { PrismaService } from '../prisma/prisma.service';
import {
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ValidationService } from '../validation/validation.service';
import {
  AddressResponse,
  CreateAddressRequest,
  DeleteAddressRequest,
  GetAddressRequest,
  UpdateAddressRequest,
} from '../model/address.model';
import * as client from '../../generated/prisma';
import { AddressValidation } from './address.validation';
import { ContactService } from '../contact/contact.service';
export class AddressService {
  constructor(
    private readonly prismaService: PrismaService,
    private validationService: ValidationService,
    private contactService: ContactService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  toAddressResponse(address: AddressResponse): AddressResponse {
    return {
      id: address.id,
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    };
  }

  async create(
    user: client.User,
    request: CreateAddressRequest,
  ): Promise<AddressResponse> {
    const addressRequest = this.validationService.validation(
      AddressValidation.CREATE,
      request,
    );

    await this.contactService.checkContactToBeExist(
      user.username,
      addressRequest.contact_id,
    );

    const address = await this.prismaService.address.create({
      data: addressRequest,
    });

    return this.toAddressResponse(address);
  }

  async addressMustBeExist(
    contactId: number,
    addressId: number,
  ): Promise<AddressResponse> {
    const address = await this.prismaService.address.findFirst({
      where: {
        id: addressId,
        contact_id: contactId,
      },
    });

    if (!address) {
      throw new NotFoundException();
    }
    return address;
  }

  async get(
    user: client.User,
    request: GetAddressRequest,
  ): Promise<AddressResponse> {
    const addressRequest = this.validationService.validation(
      AddressValidation.GET,
      request,
    );
    await this.contactService.checkContactToBeExist(
      user.username,
      addressRequest.contact_id,
    );

    const addresses = await this.prismaService.address.findFirst({
      where: {
        contact_id: addressRequest.contact_id,
        id: addressRequest.address_id,
      },
    });

    if (!addresses) throw new NotFoundException();
    return this.toAddressResponse(addresses);
  }

  async update(
    user: client.User,
    request: UpdateAddressRequest,
  ): Promise<AddressResponse> {
    const updateRequest = this.validationService.validation(
      AddressValidation.UPDATE,
      request,
    );

    //   check address and contact are exist
    await this.contactService.checkContactToBeExist(
      user.username,
      updateRequest.contact_id,
    );

    await this.addressMustBeExist(updateRequest.contact_id, updateRequest.id);

    const updatedAddress = await this.prismaService.address.update({
      where: {
        contact_id: updateRequest.contact_id,
        id: updateRequest.id,
      },
      data: updateRequest,
    });

    return this.toAddressResponse(updatedAddress);
  }

  async delete(
    user: client.User,
    request: DeleteAddressRequest,
  ): Promise<AddressResponse> {
    const deleteRequest = this.validationService.validation(
      AddressValidation.DELETE,
      request,
    );

    await this.contactService.checkContactToBeExist(
      user.username,
      deleteRequest.contact_id,
    );
    await this.addressMustBeExist(deleteRequest.contact_id, deleteRequest.id);

    const address = await this.prismaService.address.delete({
      where: {
        id: deleteRequest.id,
        contact_id: deleteRequest.contact_id,
      },
    });

    return this.toAddressResponse(address);
  }

  async list(user: client.User, contactId: number): Promise<AddressResponse[]> {
    await this.contactService.checkContactToBeExist(user.username, contactId);

    const addresses = await this.prismaService.address.findMany({
      where: {
        contact_id: contactId,
      },
    });

    return addresses.map((address) => this.toAddressResponse(address));
  }
}
