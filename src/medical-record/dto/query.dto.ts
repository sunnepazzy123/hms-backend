import { BadRequestException } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose, { Types } from 'mongoose';
import { statusType } from 'src/constants/enums';

export class QueryDto {
  @ApiPropertyOptional({
    example: '66512298aeead42c54f3b991',
    description: 'Optional MongoDB ObjectId of the patient',
  })
  @Transform(({ value }) => parseId(value))
  @IsString()
  @IsOptional()
  public patient_id: Types.ObjectId;

  @ApiPropertyOptional({
    example: 'pending',
    description: 'Optional status filter',
    enum: ['busy', 'open', 'processed', 'closed']
  })
  @IsString()
  @IsOptional()
  public status: statusType;

  @ApiPropertyOptional({
    example: '1234567890',
    description: 'Optional patient card number',
  })
  @IsString()
  @IsOptional()
  public card_no: string;
}

const parseId = (value: string) => {
  if (!Types.ObjectId.isValid(value)) {
    throw new BadRequestException('Invalid ObjectId');
  }
  const parseValue = new mongoose.Types.ObjectId(value);
  return parseValue;
};
