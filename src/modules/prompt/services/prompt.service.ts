import { Injectable } from '@nestjs/common';
import { CreatePromptDto } from '../dto/create-prompt.dto';
import { UpdatePromptDto } from '../dto/update-prompt.dto';
import { Prompt } from '../entities/prompt.entity';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from '../../redis/services/redis.service';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/user/entities/user.entity';
@Injectable()
export class PromptService {
    constructor(
        private redisService: RedisService,
        private configService: ConfigService,
    ) {}

    async create(
        user: User,
        createPromptDto: CreatePromptDto,
    ): Promise<Prompt> {
        const { title, description } = createPromptDto;

        const newPrompt: Prompt = {
            id: uuidv4(),
            title,
            description,
            favorite: false,
            author: user.id,
            createdAt: new Date(),
            lastModifiedAt: null,
        };

        const promptKey = `${this.configService.get<string>('PROMPT_PREFIX')}${
            newPrompt.id
        }`;

        const userPromptKey = `${this.configService.get<string>('USER_PROMPT_PREFIX')}${user.id}`;

        const response = await this.redisService.createPrompt(
            userPromptKey,
            promptKey,
            JSON.stringify(newPrompt),
        );
        if (!response) {
            throw new Error(
                'Error while creating prompt and linking it to the user',
            );
        }

        return newPrompt;
    }

    async findAll(user: User): Promise<Prompt[]> {
        const promptKeys = await this.redisService.smembers(
            `${this.configService.get<string>('USER_PROMPT_PREFIX')}${user.id}`,
        );


        const prompts = await Promise.all(
            promptKeys.map(async (key) => {
                const prompt = await this.redisService.get(key);

                return JSON.parse(prompt);
            }),
        );
        return prompts;
    }

    async findOne(id: string): Promise<Prompt> {
        const promptKey = `${this.configService.get<string>('PROMPT_PREFIX')}${id}`;
        const prompt = await this.redisService.get(promptKey);

        if (!prompt) {
            throw new Error('Prompt not found');
        }

        return JSON.parse(prompt);
    }

    async update(
        id: string,
        updatePromptDto: UpdatePromptDto,
    ): Promise<Prompt> {
        const promptKey = `${this.configService.get<string>('PROMPT_PREFIX')}${id}`;
        let prompt;
        try {
            prompt = await this.redisService.get(promptKey);
        } catch (error) {
            throw error;
        }

        if (!prompt) {
            throw new Error('Prompt not found');
        }

        const updatedPrompt: Prompt = {
            ...JSON.parse(prompt),
            ...updatePromptDto,
            lastModifiedAt: new Date(),
        };

        const response = await this.redisService.set(
            promptKey,
            JSON.stringify(updatedPrompt),
        );

        if (response != 'OK') {
            throw new Error('Error while updating prompt');
        }

        return updatedPrompt;
    }

    async remove(user: User, id: string): Promise<boolean> {
        const promptKey = `${this.configService.get<string>('PROMPT_PREFIX')}${id}`;
        const userPromptKey = `${this.configService.get<string>('USER_PROMPT_PREFIX')}${user.id}`;

        const response = await this.redisService.deletePrompt(
            userPromptKey,
            promptKey,
        );

        if (response == 0) {
            throw new Error('Error while deleting prompt');
        }

        return true;
    }

    async removeAllUserPrompts(user: User): Promise<boolean> {
        const userPromptKey = `${this.configService.get<string>('USER_PROMPT_PREFIX')}${user.id}`;

        const response = await this.redisService.flushUserPrompts(
            userPromptKey,
        );

        if (response == 0) {
            throw new Error('Error while deleting all user prompts');
        }

        return true;
    }

    async removeAll(): Promise<boolean> {
        const response = await this.redisService.flushall();

        if (response != 'OK') {
            throw new Error('Error while deleting all prompts');
        }

        return true;
    }
}
