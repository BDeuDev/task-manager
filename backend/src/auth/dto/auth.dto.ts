import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '********', description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(2)
  password: string;
} 