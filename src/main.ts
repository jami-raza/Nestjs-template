import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

/**
 * initialize application
 */
async function bootstrap() {

  const app = await NestFactory.create(AppModule,{cors:true});

  const config = new DocumentBuilder()
    .setTitle('Time Keeping App')
    .setDescription('Time keeping app description')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();

  // configure swagger options
  const options = {
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: 'defaultBearerAuth',
        
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
          value: '',
        },
      },
    },
  } 
};

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({forbidUnknownValues: false}));
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3000);
  
}
bootstrap();
