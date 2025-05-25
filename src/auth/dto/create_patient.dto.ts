import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { roleType } from 'src/constants/enums';
import { BasePersonDto } from './basePerson.dto';


export class CreatePatientDto extends BasePersonDto {
  @ApiProperty({ example: 'patient', enum: ['patient'], description: 'Role must be patient' })
  @IsEnum({ patient: 'patient' })
  @IsNotEmpty()
  role: roleType.patient;
}
