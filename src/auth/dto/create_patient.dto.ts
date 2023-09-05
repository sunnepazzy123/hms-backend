import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { roleType } from 'src/constants/enums';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  card_no: string;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsEnum({ male: 'male', female: 'female' })
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsOptional()
  guardian_phone: string;

  @IsEnum({ patient: 'patient' })
  @IsNotEmpty()
  role: roleType.patient;
}
