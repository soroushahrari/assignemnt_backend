import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePromptDto } from './create-prompt.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePromptDto extends PartialType(CreatePromptDto) {
    @ApiProperty({
        required: false,
        description: 'The title of the prompt',
        example: 'My Prompt',
        type: String,
    })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({
        required: false,
        description: 'The description of the prompt',
        example: 'My Prompt description',
        type: String,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        required: false,
        description: 'Whether the prompt is a favorite',
        example: true,
        type: Boolean,
    })
    @IsOptional()
    @IsBoolean()
    favorite?: boolean;

    @ApiProperty({
        required: false,
        description: 'The text of the prompt',
        example: 'My Prompt text with a {{variable}}',
        type: String,
    })
    @IsOptional()
    @IsString()
    promptText?: string;
}
