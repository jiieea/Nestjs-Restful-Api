import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post, Put,
} from '@nestjs/common';
import { AddressService } from './address.service';
import * as client from '../../generated/prisma';
import { AddressResponse, CreateAddressRequest, UpdateAddressRequest } from '../model/address.model';
import { WebModel } from '../model/web.model';
import { Auth } from '../middlewares/auth/auth.decorator';
import request from 'supertest';
@Controller('/api/contact/:contactId/addresses')
export class AddressController {
  constructor(private addressService: AddressService) {}
  @Post()
  @HttpCode(200)
  async create(
    @Body() request: CreateAddressRequest,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Auth() user: client.User,
  ): Promise<WebModel<AddressResponse>> {
    request.contact_id = contactId;
    const result = await this.addressService.create(user, request);
    return {
      data: result,
    };
  }

  @Get('/:addressId')
  @HttpCode(200)
  async get(
    @Param('contactId', ParseIntPipe) contactId: number,
    @Param('addressId', ParseIntPipe) addressId: number,
    @Auth() user: client.User,
  ): Promise<WebModel<AddressResponse>> {
    const request = {
      contact_id: contactId,
      address_id: addressId,
    };
    const result = await this.addressService.get(user, request);
    return {
      data: result,
    };
  }

  @Put('/:addressId')
  @HttpCode(200)
  async update(
    @Auth() user: client.User,
    @Param('addressId', ParseIntPipe) addressId: number,
    @Param('contactId', ParseIntPipe) contactId: number,
    @Body() request: UpdateAddressRequest,
  ): Promise<WebModel<AddressResponse>> {
    request.contact_id = contactId;
    request.id = addressId;
    const result = await this.addressService.update(user, request);
    return {
      data: result,
    };
  }

  @Delete('/:addressId')
  @HttpCode(200)
  async delete(
    @Auth() user: client.User,
    @Param('addressId', ParseIntPipe) addressId: number,
    @Param('contactId', ParseIntPipe) contactId: number,
  ): Promise<WebModel<boolean>> {
    await this.addressService.delete(user, addressId, contactId);

    return {
      data: true,
    };
  }
}
