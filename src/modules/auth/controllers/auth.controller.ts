import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IResponse } from 'src/common/interfaces/response.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ description: 'Sign up' })
    @ApiBody({ type: AuthCredentialsDto })
    @Post('signup')
    async signup(@Body() signupDto: AuthCredentialsDto): Promise<IResponse> {
        const res = this.authService.signup(signupDto);

        return {
            isSuccess: true,
            data: res,
            message: 'Signup successfully',
        };
    }

    @ApiOperation({ description: 'Login' })
    @ApiBody({ type: AuthCredentialsDto })
    @Post('login')
    async login(@Body() loginDto: AuthCredentialsDto): Promise<IResponse> {
        const res = this.authService.login(loginDto);

        return {
            isSuccess: true,
            data: res,
            message: 'Login successfully',
        };
    }
}
