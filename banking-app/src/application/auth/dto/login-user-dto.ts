import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {

  @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
  @IsString()
  @IsNotEmpty({ message: 'Login is required' }) 
  login: string;

  @ApiProperty({ example: 'Qwerty123', description: 'user password' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' }) 
  password: string;
}