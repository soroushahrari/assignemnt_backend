import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
})
export class AuthModule {}
