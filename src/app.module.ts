import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [CommonModule, AddressModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
