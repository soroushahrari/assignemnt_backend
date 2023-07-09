import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { UserService } from '../../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IAuthResponse } from '../interfaces/auth.reponse.interface';
import { IUserResponse } from '../../user/interfaces/user.reponse.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async signup(signupDto: AuthCredentialsDto): Promise<IAuthResponse> {
        const hashedPassword = await bcrypt.hash(signupDto.password, 10);

        const user = await this.userService.create({
            ...signupDto,
            password: hashedPassword,
        });

        const accessToken = await this.generateToken(user);

        return { accessToken };
    }

    async login(loginDto: AuthCredentialsDto): Promise<IAuthResponse> {
        const { email, password } = loginDto;

        const user = await this.validateUser(email, password);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const accessToken = await this.generateToken(user);

        return { accessToken };
    }

    async validateUser(
        email: string,
        password: string,
    ): Promise<IUserResponse> {
        const user = await this.userService.findByEmail(email);

        if (bcrypt.compare(password, user.password)) {
            return {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
            };
        }

        return null;
    }

    async generateToken({ id, email }): Promise<string> {
        return await this.jwtService.signAsync({ id, email });
    }
}
