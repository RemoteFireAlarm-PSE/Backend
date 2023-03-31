import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ErrorInterceptor } from './interceptors/errors.interceptors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useGlobalInterceptors(new ErrorInterceptor())

    const config = new DocumentBuilder()
        .setTitle('Fire Alarm V1 API')
        .setDescription('The V1 API for Fire Alarm built for PSE - Sem 222')
        .setVersion('1.0')
        .addTag('user')
        .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document)

    await app.listen(3000);

}
bootstrap();
