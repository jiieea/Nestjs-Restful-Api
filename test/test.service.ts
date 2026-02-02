import { PrismaService } from '../src/prisma/prisma.service';
import { HttpException, Injectable, OnModuleDestroy } from '@nestjs/common';
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

  async deleteAddress() {
    await this.prisma.address.deleteMany({});
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

  async deleteAll() {
    await this.prisma.address.deleteMany({});

    await this.prisma.contact.deleteMany({
      where: {
        username: 'FlexCode',
      },
    });

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
        password: 'atmin123',
        name: 'Yves Castillon',
        token: 'atmin',
      },
    });
  }

  async getAddress(): Promise<client.Address> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.prisma.address.findFirst({
      where: {
        contact: {
          username: 'FlexCode',
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
        province: 'provinsi jaksen',
        country: 'negara indo',
        postal_code: '101032',
      },
    });
  }
}
