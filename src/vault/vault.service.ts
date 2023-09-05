import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class VaultService {
  constructor(private jwtService: JwtService) {}

  async generateToken(body: TokenDto) {
    const payload = {
      id: body._id,
      role: body.role,
      email: body.email,
      name: body.name
    };
    return await this.jwtService.signAsync(payload);
  }

  async decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
}
