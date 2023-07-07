import { Injectable } from '@nestjs/common';
import { CreatePromptDto } from '../dto/create-prompt.dto';
import { UpdatePromptDto } from '../dto/update-prompt.dto';
import { Prompt } from '../entities/prompt.entity';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from 'src/modules/redis/services/redis.service';
@Injectable()
export class PromptService {
    constructor(private redisService: RedisService) {}

    async create(createPromptDto: CreatePromptDto): Promise<Prompt> {
        const { title, description } = createPromptDto;

        const newpRompt: Prompt = {
            id: uuidv4(),
            title,
            description,
            favorite: false,
            createdAt: new Date(),
            lastModifiedAt: null,
        };

        const response = await this.redisService.set(
            newpRompt.id,
            JSON.stringify(newpRompt),
        );

        if (response != 'OK') {
            throw new Error('Error while creating prompt');
        }

        return newpRompt;
    }

    async findAll(): Promise<Prompt[]> {
        const prompts = await this.redisService.values('*');

        return prompts.map((prompt) => {
            return JSON.parse(prompt);
        });
    }

    async findOne(id: string): Promise<Prompt> {
        const prompt = await this.redisService.get(id);

        if (!prompt) {
            throw new Error('Prompt not found');
        }

        return JSON.parse(prompt);
    }

    async update(
        id: string,
        updatePromptDto: UpdatePromptDto,
    ): Promise<Prompt> {
        let prompt;
        try {
            prompt = await this.redisService.get(id);
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
            id,
            JSON.stringify(updatedPrompt),
        );

        if (response != 'OK') {
            throw new Error('Error while updating prompt');
        }

        return updatedPrompt;
    }

    async remove(id: string): Promise<boolean> {
        const response = await this.redisService.del(id);

        if (response == 0) {
            throw new Error('Prompt not found');
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
