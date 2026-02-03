import { PrismaService } from '../src/prisma/prisma.service';
import { HttpException, Injectable, OnModuleDestroy } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Address, Contact } from '@prisma/client';
@Injectable()
export class TestService implements OnModuleDestroy {
  constructor(private prisma: PrismaService) {}
  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
  async deleteUser() {
    await this.prisma.user.deleteMany({
      where: {
        username: 'TestUser',
      },
    });
  }

  async deleteContact() {
    await this.prisma.contact.deleteMany({
      where: {
        username: 'TestUser',
      },
    });

    await this.prisma.user.deleteMany({
      where: {
        username: 'TestUser',
      },
    });
  }

  async deleteAll() {
    await this.prisma.address.deleteMany({});

    await this.prisma.contact.deleteMany({
      where: {
        username: 'TestUser',
      },
    });

    await this.prisma.user.deleteMany({
      where: {
        username: 'TestUser',
      },
    });
  }

  async getContact(): Promise<Contact | null> {
    return this.prisma.contact.findFirst({
      where: {
        username: 'TestUser',
      },
    });
  }

  async createContact() {
    await this.prisma.contact.create({
      data: {
        first_name: 'sample',
        last_name: 'test',
        email: 'sample@example.com',
        phone: '1111',
        username: 'TestUser',
      },
    });
  }

  async createUser() {
    await this.prisma.user.create({
      data: {
        username: 'TestUser',
        password: await bcrypt.hash('sample', 1),
        name: 'User',
        token: '2020434',
      },
    });
  }

  async getAddress(): Promise<Address> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.prisma.address.findFirst({
      where: {
        contact: {
          username: 'TestUser',
        },
      },
    });
  }

  async createAddress() {
    const contact = await this.getContact();
    if (!contact) {
      throw new HttpException('Not Found', 404);
    }
    await this.prisma.address.create({
      data: {
        contact_id: contact.id,
        street: 'jl.tebet',
        city: 'kota tebet',
        province: 'provinsi jaksel',
        country: 'negara indo',
        postal_code: '101032',
      },
    });
  }
}
