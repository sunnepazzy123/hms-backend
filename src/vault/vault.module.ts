import { Module } from '@nestjs/common';
import { VaultService } from './vault.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [VaultService, JwtService],
  imports: [],
  exports: [VaultService, JwtService],
})
export class VaultModule {}
