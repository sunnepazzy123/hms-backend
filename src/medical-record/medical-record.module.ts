import { Module } from '@nestjs/common';
import { MedicalRecordController } from './medical-record.controller';
import { MedicalRecordSchema } from 'src/schema/medical-record.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalRecordService } from './medical-record.service';
import { PatientsService } from 'src/patients/patients.service';
import { UserSchema } from 'src/schema/users.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'medicalRecords', schema: MedicalRecordSchema },
      { name: 'users', schema: UserSchema },
    ]),
  ],
  controllers: [MedicalRecordController],
  providers: [MedicalRecordService, PatientsService],
})
export class MedicalRecordModule {}
