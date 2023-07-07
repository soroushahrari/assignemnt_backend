import { Module } from '@nestjs/common';
import { PromptService } from './services/prompt.service';
import { PromptController } from './controllers/prompt.controller';
import { RedisModule } from '../redis/redis.module';

@Module({
    imports: [RedisModule],
    controllers: [PromptController],
    providers: [PromptService],
})
export class PromptModule {}
