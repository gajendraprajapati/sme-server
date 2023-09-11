import { HttpModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsAndConditions } from 'src/health-check/entities/conditions.entity';
import { Applicant } from 'src/health-check/entities/applicant.entity';
import { UserDocs } from 'src/health-check/entities/userDocs.entity';
import { HealthCheckModule } from 'src/health-check/healthCheck.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import dotenv = require('dotenv');
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'credilinq',
      entities: [Applicant, UserDocs, TermsAndConditions],
      synchronize: true,
      dropSchema: true,
      autoLoadEntities: true
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5
      })
    }),
    HealthCheckModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
