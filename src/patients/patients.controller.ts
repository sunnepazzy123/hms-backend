import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { ParseObjectIdPipe } from 'src/pipes/custom.pipe';
import { Types } from 'mongoose';
import { CreatePatientDto } from 'src/auth/dto/create_patient.dto';
import { JwtAuthGuard } from 'src/auth/strategy/jwt.auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Patients')
@Controller('patients')
// @UseGuards(JwtAuthGuard)
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Get()
  async getPatients() {
    return this.patientsService.findAll();
  }

  @Get('/:id')
  async getPatientId(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.patientsService.findOne(id);
  }

  @Post('/')
  async createPatient(@Body() body: CreatePatientDto) {
    return this.patientsService.create(body);
  }
}
