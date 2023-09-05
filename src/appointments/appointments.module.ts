import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalRecordSchema } from 'src/schema/medical-record.schema';
import { AppointmentController } from './appointments.controller';
import { AppointmentService } from './appointments.service';
import { MedicalRecordService } from 'src/medical-record/medical-record.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'medicalRecords', schema: MedicalRecordSchema },
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, MedicalRecordService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
