import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationController } from './application.controller';
import { TermsAndConditions } from './entities/conditions.entity';
import { Applicant } from './entities/applicant.entity';
import { UserDocs } from './entities/userDocs.entity';
import { ConditionService } from "./services/conditions.service";
import { DocumentService } from "./services/documents.service";
import { ApplicantService } from './services/applicant.service';

@Module({
  imports: [TypeOrmModule.forFeature([Applicant, UserDocs, TermsAndConditions])],
  controllers: [ApplicationController],
  providers: [ApplicantService, DocumentService, ConditionService],
  exports: [ApplicantService, DocumentService, ConditionService],
})
export class HealthCheckModule { }