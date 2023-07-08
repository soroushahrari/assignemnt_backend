import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    private readonly _client: any;
    constructor(private configService: ConfigService) {
        this._client = new Redis({
            host: this.configService.get<string>('REDIS_HOST'),
            port: this.configService.get<number>('REDIS_PORT'),
            password: this.configService.get<string>('REDIS_PASSWORD'),
            username: this.configService.get<string>('REDIS_USERNAME'),
        });
    }

    get client(): any {
        return this._client;
    }

    async get(key: string): Promise<string> {
        return await this.client.get(key);
    }

    async set(key: string, value: string): Promise<string> {
        return await this.client.set(key, value);
    }

    async del(key: string): Promise<number> {
        return await this.client.del(key);
    }

    async keys(pattern: string): Promise<string[]> {
        return await this.client.keys(pattern);
    }

    async values(pattern: string): Promise<string[]> {
        const values: string[] = [];
        let cursor = '0';

        do {
            const res = await this.client.scan(cursor, 'MATCH', pattern);
            cursor = res[0];
            const keys: [] = res[1];

            if (keys.length > 0) {
                const retrievedValues = await this.client.mget(...keys);
                values.push(...retrievedValues);
            }
        } while (cursor !== '0');

        return values;
    }

    async flushall(): Promise<string> {
        return await this.client.flushall();
    }
}
