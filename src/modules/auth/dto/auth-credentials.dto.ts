import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthCredentialsDto {
    @ApiProperty({ type: String, description: 'Email', required: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        description: 'Password',
        required: true,
        minLength: 6,
    })
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
