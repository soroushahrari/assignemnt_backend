import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePromptDto {
    @ApiProperty({
        required: true,
        description: 'The title of the prompt',
        example: 'My Prompt',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        required: true,
        description: 'The description of the prompt',
        example: 'My Prompt description',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}
