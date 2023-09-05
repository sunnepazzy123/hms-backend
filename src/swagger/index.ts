import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerDoc = (app: INestApplication) => {
  const userConfig = new DocumentBuilder()
    .setTitle('Hospital Management System')
    .setDescription('The Application API description')
    .setVersion('2.0')
    .addTag('Documentation')
    .setContact(
      'Sunday Odibo',
      'http://wiredevteam.com',
      'sunnepazzy123@gmail.com',
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, userConfig);
  SwaggerModule.setup('api/docs', app, document);
};
