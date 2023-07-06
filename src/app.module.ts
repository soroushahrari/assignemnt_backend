import { Module } from '@nestjs/common';
import { PromptModule } from './modules/prompt/prompt.module';

@Module({
    imports: [PromptModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
