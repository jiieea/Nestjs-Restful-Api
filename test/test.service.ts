import { PrismaService } from '../src/prisma/prisma.service';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as client from '../generated/prisma/client';
@Injectable()
export class TestService implements OnModuleDestroy {
  constructor(private prisma: PrismaService) {}
  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
  async deleteUser() {
    await this.prisma.user.deleteMany({
      where: {
        username: 'FlexCode',
      },
    });
  }

  async deleteContact() {
    await this.prisma.contact.deleteMany({
      where: {
        username: 'FlexCode',
      },
    });

    // 3. Finally, delete the parent (User)
    await this.prisma.user.deleteMany({
      where: {
        username: 'FlexCode',
      },
    });
  }

  async getContact(): Promise<client.Contact | null> {
    return this.prisma.contact.findFirst({
      where: {
        username: 'FlexCode',
      },
    });
  }

  async createContact() {
    await this.prisma.contact.create({
      data: {
        first_name: 'Yves',
        last_name: 'Castilon',
        email: 'yves@example.com',
        phone: '0909',
        username: 'FlexCode',
      },
    });
  }
  async createUser() {
    await this.prisma.user.create({
      data: {
        username: 'FlexCode',
        password: await bcrypt.hash('atmin123', 10),
        name: 'Yves Castillon',
        token: 'atmin',
      },
    });
  }
}
