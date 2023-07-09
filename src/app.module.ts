import { Module } from '@nestjs/common';
import { PromptModule } from './modules/prompt/prompt.module';
import { RedisModule } from './modules/redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        PromptModule,
        RedisModule,
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
