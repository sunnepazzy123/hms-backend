import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { statusEnumType, statusType } from 'src/constants/enums';
import { IVital } from 'src/schema/vitals.schema';

export class UpdateMedicalRecordDto {
  @IsString()
  @IsOptional()
  staff_id: string;

  @IsString()
  @IsNotEmpty()
  patient_id: string;

  @IsString()
  @IsNotEmpty()
  card_no: string;

  @IsString()
  @IsOptional()
  diagnosis: string;

  @IsObject()
  @IsOptional()
  vital: IVital;

  @IsString()
  @IsOptional()
  note: string;

  @IsString()
  @IsOptional()
  assignee: string;

  @IsString()
  @IsOptional()
  comments: string;

  @IsEnum(statusEnumType)
  @IsOptional()
  status: statusType;
}

export interface IUpdateMedicalRecord {
  staff_id?: Types.ObjectId;
  patient_id: Types.ObjectId;
  card_no: string;
  diagnosis: string;
  comments: string;
}
