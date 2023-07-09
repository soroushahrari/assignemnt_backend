import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor() {}

    async create(createUserDto: CreateUserDto) {
        return createUserDto;
    }

    async findAll() {
        return 'This action returns all user';
    }

    async findById(id: string) {
        return `This action returns a #${id} user`;
    }

    async findByUsername(username: string) {
        return `This action returns a ${username} user`;
    }

    async findByEmail(email: string) {
        return `This action returns a ${email} user`;
    }
}
