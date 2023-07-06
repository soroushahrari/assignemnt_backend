import { Test, TestingModule } from '@nestjs/testing';
import { PromptService } from '../services/prompt.service';
import 'jest-extended';

describe('PromptService', () => {
    let service: PromptService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PromptService],
        }).compile();

        service = module.get<PromptService>(PromptService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a prompt on success', async () => {
        const newPrompt = await service.create({
            title: 'Test Prompt',
            description: 'Test Prompt Description',
        });

        expect(newPrompt).toEqual({
            id: expect.any(Number),
            title: 'Test Prompt',
            description: 'Test Prompt Description',
            favorite: false,
            createdAt: expect.any(Date),
            lastModifiedAt: null,
        });
    });

    it('should get all prompts on success', async () => {
        const prompts = await service.findAll();

        expect(prompts).toEqual([
            {
                id: expect.any(Number),
                title: expect.any(String),
                description: expect.any(String),
                favorite: expect.any(Boolean),
                createdAt: expect.any(Date),
                lastModifiedAt: expect.toBeOneOf([null, expect.any(Date)]),
            },
        ]);
    });

    it('should get a prompt by id on success', async () => {
        const prompt = await service.findOne(1);

        expect(prompt).toEqual({
            id: 1,
            title: expect.any(String),
            description: expect.any(String),
            favorite: expect.any(Boolean),
            createdAt: expect.any(Date),
            lastModifiedAt: expect.toBeOneOf([null, expect.any(Date)]),
        });
    });

    it('should update a prompt by id on success', async () => {
        const newTitle = 'Updated Prompt';
        const newDescription = 'Updated Prompt Description';
        const newFavorite = true;
        const updatedPrompt = await service.update(1, {
            title: newTitle,
            description: newDescription,
            favorite: newFavorite,
        });

        expect(updatedPrompt).toEqual({
            id: 1,
            title: newTitle,
            description: newDescription,
            favorite: newFavorite,
            createdAt: expect.any(Date),
            lastModifiedAt: expect.any(Date),
        });
    });

    it('should delete a prompt by id on success', async () => {
        const deletedPrompt = await service.remove(1);

        expect(deletedPrompt).toEqual({
            id: 1,
            title: expect.any(String),
            description: expect.any(String),
            favorite: expect.any(Boolean),
            createdAt: expect.any(Date),
            lastModifiedAt: expect.toBeOneOf([null, expect.any(Date)]),
        });
    });

    it('should throw an error when trying to get a prompt by id that does not exist', async () => {
        await expect(service.findOne(999)).rejects.toThrowError('Not Found');
    });

    it('should throw an error when trying to update a prompt by id that does not exist', async () => {
        await expect(
            service.update(999, {
                title: 'Updated Prompt',
                description: 'Updated Prompt Description',
                favorite: true,
            }),
        ).rejects.toThrowError('Not Found');
    });

    it('should throw an error when trying to delete a prompt by id that does not exist', async () => {
        await expect(service.remove(999)).rejects.toThrowError('Not Found');
    });
});
