import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { genderType } from 'src/constants/enums';

export class BasePersonDto {
  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({ example: '1234567890', description: 'Card number (optional)' })
  @IsString()
  @IsOptional()
  card_no: string;

  @ApiProperty({ example: '2000-01-01', description: 'Date of birth (YYYY-MM-DD)' })
  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty({ example: 'male', enum: genderType, description: 'Gender' })
  @IsEnum(genderType)
  @IsNotEmpty()
  gender: genderType;

  @ApiProperty({ example: '123 Main St', description: 'Home address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '08012345678', description: 'Phone number' })
  @IsNumberString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ example: '08087654321', description: 'Guardian phone number (optional)' })
  @IsNumberString()
  @IsOptional()
  guardian_phone: string;
}
