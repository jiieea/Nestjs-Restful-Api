import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ValidationService } from '../validation/validation.service';
@Module({
  imports: [],
  exports: [ContactService],
  controllers: [ContactController],
  providers: [ContactService, PrismaService, ValidationService],
})
export class ContactModule {}
