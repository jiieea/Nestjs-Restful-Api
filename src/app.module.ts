import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './common/user/user.service';

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [PrismaService, UserService],
})
export class AppModule {}
