import { Types } from 'mongoose';
import {
  IsString,
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsObjectId(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) {
            return false;
          }
          return Types.ObjectId.isValid(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid ObjectId`;
        },
      },
    });
  };
}

export class TokenDto {
  @IsObjectId()
  _id: Types.ObjectId;

  @IsString()
  role: string;

  @IsString()
  email: string;

  @IsString()
  name: string;
}
