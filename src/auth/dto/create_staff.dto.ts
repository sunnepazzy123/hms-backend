import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { roleType } from 'src/constants/enums';
import { BasePersonDto } from './basePerson.dto';


export class CreateStaffDto extends BasePersonDto {
  @ApiProperty({ example: 'staff@example.com', description: 'Email address' })
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'StrongPass123!', description: 'Password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: roleType.admin, enum: roleType, description: 'Staff role' })
  @IsEnum(roleType)
  @IsNotEmpty()
  role: roleType;
}
