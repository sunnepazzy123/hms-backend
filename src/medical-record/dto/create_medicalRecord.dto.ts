import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { IVital } from 'src/schema/vitals.schema';

export class CreateMedicalRecordDto {
  @IsString()
  @IsOptional()
  staff_id: string;

  @IsString()
  @IsNotEmpty()
  card_no: string;

  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @IsObject()
  @IsNotEmpty()
  vital: IVital;

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  @IsNotEmpty()
  assignee: string;
}

export interface ICreateMedicalRecord {
  staff_id?: Types.ObjectId;
  card_no: string;
  diagnosis: string;
}
