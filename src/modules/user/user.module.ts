import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RedisModule } from '../redis/redis.module';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [RedisModule],
    exports: [UserService],
})
export class UserModule {}
