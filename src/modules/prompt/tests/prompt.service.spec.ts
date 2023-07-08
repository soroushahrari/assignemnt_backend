import { Test, TestingModule } from '@nestjs/testing';
import { PromptService } from '../services/prompt.service';
import 'jest-extended';
import { RedisModule } from '../../../modules/redis/redis.module';
import { RedisService } from '../../../modules/redis/services/redis.service';

describe('PromptService', () => {
    let service: PromptService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: PromptService,
                    useValue: {
                        create: jest.fn().mockImplementation((dto) => {
                            return {
                                id: '1',
                                ...dto,
                                favorite: false,
                                createdAt: new Date().toISOString(),
                                lastModifiedAt: null,
                            };
                        }),
                        findAll: jest.fn().mockImplementation(() => {
                            return [
                                {
                                    id: '1',
                                    title: 'Test Prompt',
                                    description: 'Test Prompt Description',
                                    favorite: false,
                                    createdAt: new Date().toISOString(),
                                    lastModifiedAt: null,
                                },
                            ];
                        }),
                        findOne: jest.fn().mockImplementation((id) => {
                            return {
                                id,
                                title: 'Test Prompt',
                                description: 'Test Prompt Description',
                                favorite: false,
                                createdAt: new Date().toISOString(),
                                lastModifiedAt: null,
                            };
                        }),
                        update: jest.fn().mockImplementation((id, dto) => {
                            return {
                                id,
                                ...dto,
                                favorite: true,
                                createdAt: new Date().toISOString(),
                                lastModifiedAt: new Date().toISOString(),
                            };
                        }),
                        remove: jest.fn().mockImplementation((id) => {
                            return {
                                id,
                                title: 'Test Prompt',
                                description: 'Test Prompt Description',
                                favorite: false,
                                createdAt: new Date().toISOString(),
                                lastModifiedAt: null,
                            };
                        }),
                    },
                },
            ],
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
            id: expect.any(String),
            title: 'Test Prompt',
            description: 'Test Prompt Description',
            favorite: false,
            createdAt: expect.any(String),
            lastModifiedAt: null,
        });
    });

    it('should get all prompts on success', async () => {
        const prompts = await service.findAll();

        expect(prompts).toEqual([
            {
                id: expect.any(String),
                title: expect.any(String),
                description: expect.any(String),
                favorite: expect.any(Boolean),
                createdAt: expect.any(String),
                lastModifiedAt: expect.toBeOneOf([null, expect.any(String)]),
            },
        ]);
    });

    it('should get a prompt by id on success', async () => {
        const prompt = await service.findOne('1');

        expect(prompt).toEqual({
            id: '1',
            title: expect.any(String),
            description: expect.any(String),
            favorite: expect.any(Boolean),
            createdAt: expect.any(String),
            lastModifiedAt: expect.toBeOneOf([null, expect.any(String)]),
        });
    });

    it('should update a prompt by id on success', async () => {
        const newTitle = 'Updated Prompt';
        const newDescription = 'Updated Prompt Description';
        const newFavorite = true;
        const updatedPrompt = await service.update('1', {
            title: newTitle,
            description: newDescription,
            favorite: newFavorite,
        });

        expect(updatedPrompt).toEqual({
            id: '1',
            title: newTitle,
            description: newDescription,
            favorite: newFavorite,
            createdAt: expect.any(String),
            lastModifiedAt: expect.any(String),
        });
    });

    it('should delete a prompt by id on success', async () => {
        const deletedPrompt = await service.remove('1');

        expect(deletedPrompt).toEqual({
            id: '1',
            title: expect.any(String),
            description: expect.any(String),
            favorite: expect.any(Boolean),
            createdAt: expect.any(String),
            lastModifiedAt: expect.toBeOneOf([null, expect.any(String)]),
        });
    });
});
