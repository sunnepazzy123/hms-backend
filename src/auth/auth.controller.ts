import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatePatientDto } from './dto/create_patient.dto';
import { CreateStaffDto } from './dto/create_staff.dto';
import { LoginDto } from './dto/login.dto';
import { VaultService } from 'src/vault/vault.service';
import { JwtAuthGuard } from './strategy/jwt.auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private vaultService: VaultService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/register_patient')
  async register_patient(@Body() body: CreatePatientDto, @Req() req: any) {
    const patient = await this.authService.register_patient(body);
    return patient;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/register_staff')
  async register_staff(@Body() body: CreateStaffDto) {
    const staff = await this.authService.register_staff(body);
    return staff;
  }

  @Post('/login')
  async login(@Body() body: LoginDto, @Req() req: any) {
    const user = await this.authService.login(body);
    req.user = user;
    const token = await this.vaultService.generateToken(user);

    return { token: token };
  }
}
