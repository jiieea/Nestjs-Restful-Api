import { PrismaService } from '../src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}
  async deleteUser() {
    await this.prisma.user.deleteMany({
      where: {
        username: 'Test',
      },
    });
  }
  async createUser() {
    await this.prisma.user.create({
      data: {
        username: 'Test',
        password: await bcrypt.hash('test', 10),
        name: 'test',
      },
    });
  }
}
