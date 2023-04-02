import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
    imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        LoggerModule.forRoot({
            pinoHttp: {
                customProps: (req, res) => ({
                    context: 'HTTP',
                }),
                transport: {
                    target: 'pino-pretty',
                    options: {
                        singleLine: true,
                    },
                },
            },
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
