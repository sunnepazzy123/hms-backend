import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidVital', async: false })
export class IsValidVitalConstraint implements ValidatorConstraintInterface {
  validate(value: IVitalDto, args: ValidationArguments) {
    if (!value) {
      return true; // Empty value is allowed, assuming @IsOptional() is used
    }

    if (
      value.blood_pressure &&
      (value.blood_pressure < 0 || value.blood_pressure > 300)
    ) {
      return false; // Blood pressure range is unrealistic, assuming mmHg
    }

    if (value.pulse && (value.pulse < 0 || value.pulse > 300)) {
      return false; // Pulse range is unrealistic, assuming BPM
    }

    if (
      value.temperature &&
      (value.temperature < 25 || value.temperature > 45)
    ) {
      return false; // Temperature range is unrealistic, assuming Celsius
    }

    if (value.height && (value.height < 30 || value.height > 300)) {
      return false; // Height range is unrealistic, assuming cm
    }

    if (value.weight && (value.weight < 2 || value.weight > 500)) {
      return false; // Weight range is unrealistic, assuming kg
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid vital sign measurements';
  }
}

export class IVitalDto {
  @IsNumber()
  @IsOptional()
  blood_pressure: number;

  @IsNumber()
  @IsNotEmpty()
  pulse: number;

  @IsNumber()
  @IsNotEmpty()
  temperature: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;
}
