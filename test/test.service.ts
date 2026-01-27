import { PrismaService } from '../src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}
  async deleteUser() {
    await this.prisma.user.deleteMany({
      where: {
        username: 'Jieyra@30',
      },
    });
  }
  async createUser() {
    await this.prisma.user.create({
      data: {
        username: 'Jieyra@30',
        password: await bcrypt.hash('jiee123', 10),
        name: 'Jieyra',
        token: 'test',
      },
    });
  }
}
