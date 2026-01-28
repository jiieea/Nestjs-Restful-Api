import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { CommonModule } from '../src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [TestService, PrismaService],
})
export class TestModule {}
