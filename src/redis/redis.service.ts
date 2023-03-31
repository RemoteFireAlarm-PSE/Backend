import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {
    constructor(configService: ConfigService) {
        const redis_URL = configService.get<string>('REDIS_URL');
        if (!redis_URL) {
            throw Error('Environment variable "REDIS_URL" not found');
        }
        super(redis_URL);
    }
}
