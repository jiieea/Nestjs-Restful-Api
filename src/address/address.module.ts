import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ValidationService } from '../validation/validation.service';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [ContactModule],
  controllers: [AddressController],
  providers: [AddressService, PrismaService, ValidationService],
})
export class AddressModule {}
