import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RedisService } from '../redis/services/redis.service';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        private redisService: RedisService,
        private configService: ConfigService,
        ) { }

    async create(createUserDto: CreateUserDto) {

        const newUser: User = {
            id: uuidv4(),
            createdAt: new Date(),
            ...createUserDto,
        };

        const userKey = `${this.configService.get<string>('USER_PREFIX')}${
            newUser.id
        }`;
        const response = await this.redisService.set(
            userKey,
            JSON.stringify(newUser),
        );

        if (response !== 'OK') {
            throw new Error('Error while creating user');
        }

        return newUser;
    }

    async findAll(): Promise<User[]> {
        const users = await this.redisService.values('user:*');

        return users.map((user) => {
            return JSON.parse(user);
        });
    }

    async findById(id: string): Promise<User> {
        const user = await this.redisService.get(`user:${id}`);

        if (!user) {
            throw new Error('User not found');
        }

        return JSON.parse(user);
    }

    async findByEmail(email: string): Promise<User> {
        const users = await this.findAll();

        const user = users.find((user) => user.email === email);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }
}
