import { PartialType } from '@nestjs/swagger';
import { CreatePromptDto } from './create-prompt.dto';

export class UpdatePromptDto extends PartialType(CreatePromptDto) {
    title?: string;
    description?: string;
    favorite?: boolean;
}
