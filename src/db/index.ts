
// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import developmentConfig from './config/development.config';
// import productionConfig from './config/production.config';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig,
//     }),
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: process.env.DATABASE_HOST,
//       port: process.env.DATABASE_PORT,
//       username: process.env.DATABASE_USERNAME,
//       password: process.env.DATABASE_PASSWORD,
//       database: process.env.DATABASE_NAME,
//       // Other TypeORM options...
//     }),
//   ],
// })
// export class DatabaseModule {}
