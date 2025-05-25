import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IVital } from 'src/schema/vitals.schema';
import { Types } from 'mongoose';

export class CreateMedicalRecordDto {
  @ApiPropertyOptional({
    example: '664b11110a2d9a5b8d2c3c4e',
    description: 'Optional ID of the staff creating the record',
  })
  @IsString()
  @IsOptional()
  staff_id: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Patient card number',
  })
  @IsString()
  @IsNotEmpty()
  card_no: string;

  @ApiProperty({
    example: 'Malaria and Typhoid',
    description: 'Medical diagnosis for the patient',
  })
  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @ApiProperty({
    description: 'Vital signs data (object format)',
    example: {
      temperature: 36.7,
      bloodPressure: 120,
      pulseRate: 72,
      respirationRate: 18,
    },
  })
  @IsObject()
  @IsNotEmpty()
  vital: IVital;

  @ApiPropertyOptional({
    example: 'Patient advised to rest and stay hydrated.',
    description: 'Optional additional note',
  })
  @IsString()
  @IsOptional()
  note: string;

  @ApiProperty({
    example: '664b11110a2d9a5b8d2c3c4e',
    description: 'ID of the assigned medical personnel',
  })
  @IsString()
  @IsNotEmpty()
  assignee: string;
}


export interface ICreateMedicalRecord {
  staff_id?: Types.ObjectId;
  card_no: string;
  diagnosis: string;
}
