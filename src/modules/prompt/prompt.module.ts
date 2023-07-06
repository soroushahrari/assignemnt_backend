import { Module } from '@nestjs/common';
import { PromptService } from './services/prompt.service';
import { PromptController } from './controllers/prompt.controller';

@Module({
    controllers: [PromptController],
    providers: [PromptService],
})
export class PromptModule {}
