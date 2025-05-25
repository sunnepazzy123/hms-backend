import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Valid email address used as username',
  })
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
