import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { IVital } from 'src/schema/vitals.schema';

export class CreateMedicalRecordDto {
  @IsString()
  @IsOptional()
  staff_id: string;
}

export interface ICreateMedicalRecord {
  staff_id?: Types.ObjectId;
  patient_id: Types.ObjectId;
  card_no: string;
  diagnosis: string;
  comments: string;
}
