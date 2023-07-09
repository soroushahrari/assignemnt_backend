import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor() {}

    async signup(signupDto: SignupDto) {
        return signupDto;
    }

    async login(loginDto: LoginDto) {
        return loginDto;
    }

    async logout() {
        return 'Logged out';
    }

    async validateUser() {
        return 'User validated';
    }

    async generateToken() {
        return 'Token generated';
    }
}
