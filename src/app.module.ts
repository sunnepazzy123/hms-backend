import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { StaffsModule } from './staffs/staffs.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentModule } from './appointments/appointments.module';

const setEnvironmennt = () => {
  if (process.env.NODE_ENV === 'development') {
    return `.env.${process.env.NODE_ENV}`;
  }

  return '.env';
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: setEnvironmennt(),
    }),
    MongooseModule.forRoot(process.env.DATABASE_HOST, {
      dbName: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USERNAME,
      pass: process.env.DATABASE_PASSWORD,
    }),
    PatientsModule,
    StaffsModule,
    MedicalRecordModule,
    AuthModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
