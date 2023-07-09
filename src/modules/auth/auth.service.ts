import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signup(signupDto: SignupDto): Promise<any> {
        const hashedPassword = await bcrypt.hash(signupDto.password, 10);

        const user = await this.userService.create({
            ...signupDto,
            password: hashedPassword,
        });

        const accessToken = await this.generateToken(user);

        console.log(accessToken);
        return { accessToken };
    }

    async login(loginDto: LoginDto): Promise<any> {
        const { email, password } = loginDto;

        const user = await this.validateUser(email, password);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const accessToken = await this.generateToken(user);

        return { accessToken };
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        if (bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async generateToken({ id, email }) {
        return await this.jwtService.signAsync(
            { id, email },
            { expiresIn: '1d' },
        );
    }
}
