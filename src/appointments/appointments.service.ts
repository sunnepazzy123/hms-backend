import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { statusType } from 'src/constants/enums';
import { MedicalRecord } from 'src/schema/medical-record.schema';
import { UpdateMedicalRecordDto } from 'src/medical-record/dto/update_medicalRecord.dto';
import { MedicalRecordService } from 'src/medical-record/medical-record.service';

@Injectable()
export class AppointmentService {
  constructor(private medicalRecordService: MedicalRecordService) {}

  async findId(id: Types.ObjectId): Promise<MedicalRecord> {
    return await this.medicalRecordService.findOne(id);
  }

  async findAll(status?: statusType): Promise<MedicalRecord[]> {
    return await this.medicalRecordService.findAll(status);
  }

  async update(
    id: Types.ObjectId,
    body: UpdateMedicalRecordDto,
  ): Promise<MedicalRecord> {
    const medicalRecord = await this.medicalRecordService.update(id, body);
    return medicalRecord;
  }
}
