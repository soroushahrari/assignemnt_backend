import { Module } from '@nestjs/common';
import { PromptModule } from './modules/prompt/prompt.module';
import { RedisModule } from './modules/redis/redis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        PromptModule,
        RedisModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
