import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointments.service';
import { JwtAuthGuard } from '../auth/strategy/jwt.auth.guard';
import { Types } from 'mongoose';
import { UpdateMedicalRecordDto } from 'src/medical-record/dto/update_medicalRecord.dto';
import { roleType, statusType } from 'src/constants/enums';
import { RoleAuthGuard } from 'src/guards/roleAuthGuard.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Appointments')
@Controller('/appointments')
@UseGuards(JwtAuthGuard, new RoleAuthGuard(roleType.nurse))
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Get()
  async get(@Query('status') status: statusType) {
    return await this.appointmentService.findAll(status);
  }

  @Put('/:id')
  async update(
    @Param('/:id') id: Types.ObjectId,
    @Body() body: UpdateMedicalRecordDto,
  ) {
    return await this.appointmentService.update(id, body);
  }
}
