import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
    UseGuards,
} from '@nestjs/common';
import { PromptService } from '../services/prompt.service';
import { CreatePromptDto } from '../dto/create-prompt.dto';
import { UpdatePromptDto } from '../dto/update-prompt.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/modules/user/entities/user.entity';

@ApiTags('prompt')
@Controller('prompt')
@UseGuards(JwtAuthGuard)
export class PromptController {
    constructor(private readonly promptService: PromptService) { }

    @ApiOperation({
        description: 'Create a prompt',
    })
    @ApiBody({
        type: CreatePromptDto,
    })
    @Post()
    async create(
        @GetUser() user: User,
        @Body() createPromptDto: CreatePromptDto,
    ): Promise<IResponse> {
        try {
            const res = await this.promptService.create(user, createPromptDto);

            return {
                isSuccess: true,
                message: 'Prompt created successfully',
                data: res,
            };
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    @ApiOperation({
        description: 'Get all prompts',
    })
    @Get()
    async findAll(@GetUser() user: User): Promise<IResponse> {
        const res = await this.promptService.findAll(user);

        return {
            isSuccess: true,
            message: 'Prompts fetched successfully',
            data: res,
        };
    }

    @ApiOperation({
        description: 'Get a prompt by id',
    })
    @ApiParam({
        name: 'id',
        description: 'The id of the prompt',
        type: String,
    })
    @Get(':id')
    async findOne(
        @GetUser() user: User,
        @Param('id') id: string,
    ): Promise<IResponse> {
        try {
            const res = await this.promptService.findOne(id);

            if (res.author !== user.id) {
                throw new Error('Unauthorized');
            }

            return {
                isSuccess: true,
                message: 'Prompt fetched successfully',
                data: res,
            };
        } catch (error) {
            if (error.message === 'Unauthorized') {
                throw new HttpException(error, 401);
            }
            throw new HttpException(error, 404);
        }
    }

    @ApiOperation({
        description: 'Update a prompt by id',
    })
    @ApiParam({
        name: 'id',
        description: 'The id of the prompt',
        type: String,
    })
    @ApiBody({
        type: UpdatePromptDto,
    })
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePromptDto: UpdatePromptDto,
    ): Promise<IResponse> {
        try {
            const res = await this.promptService.update(id, updatePromptDto);

            return {
                isSuccess: true,
                message: 'Prompt updated successfully',
                data: res,
            };
        } catch (error) {
            if (error.message === 'Prompt not found') {
                throw new HttpException(error, 404);
            }
            throw new HttpException(error, 500);
        }
    }

    @ApiOperation({
        description: 'Delete a prompt by id',
    })
    @ApiParam({
        name: 'id',
        description: 'The id of the prompt',
        type: String,
    })
    @ApiResponse({
        status: 200,
        description: 'The prompt deleted successfully.',
        type: CreatePromptDto,
    })
    @Delete(':id')
    async remove(
        @GetUser() user: User,
        @Param('id') id: string,
    ): Promise<IResponse> {
        try {
            await this.promptService.remove(user, id);

            return {
                isSuccess: true,
                message: 'Prompt deleted successfully',
            };
        } catch (error) {
            throw new HttpException(error, 404);
        }
    }

    @ApiOperation({
        description: 'Delete all prompts',
    })
    @ApiResponse({
        status: 200,
        description: 'All prompts deleted successfully.',
        type: CreatePromptDto,
    })
    @Delete()
    async removeAll(): Promise<IResponse> {
        try {
            await this.promptService.removeAll();

            return {
                isSuccess: true,
                message: 'All prompts deleted successfully',
            };
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }
}
