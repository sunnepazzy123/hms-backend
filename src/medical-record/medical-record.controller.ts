import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { ParseObjectIdPipe } from 'src/pipes/custom.pipe';
import mongoose, { Types } from 'mongoose';
import { PatientsService } from 'src/patients/patients.service';
import { JwtAuthGuard } from 'src/auth/strategy/jwt.auth.guard';
import { CreateMedicalRecordDto } from './dto/create_medicalRecord.dto';
import { UpdateMedicalRecordDto } from './dto/update_medicalRecord.dto';
import { statusType } from 'src/constants/enums';
import { ApiTags } from '@nestjs/swagger';
import { IMedicalRecord } from 'src/schema/medical-record.schema';
import { QueryDto } from './dto/query.dto';

@ApiTags('MedicalRecord')
@Controller('/medical-records')
// @UseGuards(JwtAuthGuard)
export class MedicalRecordController {
  constructor(
    private medicalRecordService: MedicalRecordService,
    private patientService: PatientsService,
  ) {}

  @Get('/')
  async get(@Query() query: QueryDto) {
    return this.medicalRecordService.findAll(query);
  }

  @Get('/patients/:id')
  async getPatientRecord(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.medicalRecordService.findByPatientId(id);
  }

  @Get('/:id')
  async getId(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    const record = await this.medicalRecordService.findOne(id);
    return record;
  }

  @Post('/')
  async create(@Body() body: CreateMedicalRecordDto) {
    if (body.staff_id && !Types.ObjectId.isValid(body.staff_id)) {
      throw new NotFoundException('invalid staff id');
    }

    if (body.assignee && !Types.ObjectId.isValid(body.assignee)) {
      throw new NotFoundException('invalid assignee id');
    }

    const userCard = await this.patientService.findOneByCardId(body.card_no);
    if (!userCard) {
      throw new NotFoundException('card number not found');
    }

    let staff_id: Types.ObjectId | null = null;

    if (body.staff_id) {
      staff_id = new mongoose.Types.ObjectId(body.staff_id);
    }

    const assignee_id = new mongoose.Types.ObjectId(body.assignee);

    const medicalRecord = {
      staff_id: staff_id,
      patient_id: userCard._id,
      card_no: userCard.card_no,
      diagnosis: body.diagnosis,
    };

    // create medical record
    const newMedicalRecord = await this.medicalRecordService.create(
      medicalRecord,
    );
    // save medical record
    newMedicalRecord.vitals.push(body.vital);
    newMedicalRecord.assignee.push(assignee_id);
    newMedicalRecord.notes.push({ description: body.note });
    newMedicalRecord.save();
    return newMedicalRecord;
  }

  @Put('/:id')
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateMedicalRecordDto,
  ) {
    const updateRecord = await this.medicalRecordService.update(id, body);

    return updateRecord;
  }
}
