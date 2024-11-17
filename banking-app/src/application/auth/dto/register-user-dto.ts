import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class RegisterUserDto{
    @ApiProperty({ example: 'john', description: 'user name' })
    @IsString()
    name: string

    @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
    @IsEmail({}, {message: ' Incorrect email address format.'})
    email: string

    @ApiProperty({ example: '!Qwerty123', description: 'user password' })
    @IsString()
    @MinLength(8, { message: 'Password is too short (minimum 8 characters).' })
    @MaxLength(128, { message: 'Password is too long (maximum 128 characters).' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one capital letter.'})
    @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter.' })
    @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number.' })
    @Matches(/(?=.*[@$!%*?&])/, { message: 'The password must contain at least one special character (@$!%*?&).' })
    password: string
}