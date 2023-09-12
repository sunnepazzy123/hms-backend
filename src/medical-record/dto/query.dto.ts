import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose, { Types } from 'mongoose';
import { statusType } from 'src/constants/enums';

export class QueryDto {
  @Transform(({ value }) => parseId(value))
  @IsString()
  @IsOptional()
  public patient_id: Types.ObjectId

  @IsString()
  @IsOptional()
  public status: statusType;

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
