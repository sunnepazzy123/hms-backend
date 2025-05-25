import { PartialType } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional } from 'class-validator';
import { statusEnumType, statusType } from 'src/constants/enums';
import { CreateMedicalRecordDto } from './create_medicalRecord.dto';
import { Types } from 'mongoose';

export class UpdateMedicalRecordDto extends PartialType(CreateMedicalRecordDto) {
  @ApiPropertyOptional({ example: '664b11110a2d9a5b8d2c3c4e' })
  @IsString()
  @IsOptional()
  patient_id: string;

  @ApiPropertyOptional({ example: 'Reviewed and updated by staff.' })
  @IsString()
  @IsOptional()
  comments: string;

  @ApiPropertyOptional({ enum: statusEnumType, example: statusEnumType.busy })
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
