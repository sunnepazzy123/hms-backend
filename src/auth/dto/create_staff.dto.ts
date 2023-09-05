import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { genderType, roleType } from 'src/constants/enums';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  card_no: string;

  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @IsEnum(genderType)
  @IsNotEmpty()
  gender: genderType;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  @IsOptional()
  guardian_phone: string;

  @IsEnum(roleType)
  @IsNotEmpty()
  role: roleType;
}
