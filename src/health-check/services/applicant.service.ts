import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Applicant } from '../entities/applicant.entity';
import { IApplicationForm } from '../interfaces/application.request';
import { ConditionService } from './conditions.service';
import { DocumentService } from './documents.service';

@Injectable()
export class ApplicantService {

  constructor(
    @InjectRepository(Applicant)
    private applicantRepository: Repository<Applicant>,
    private documentService: DocumentService,
    private conditionService: ConditionService,
  ) { }

  async saveUser(user: Applicant): Promise<Applicant> {
    return this.applicantRepository.save(user);
  }

  async processApplication(application: IApplicationForm) {
    const { businessUEN, businessName, fullname, position, mobile, email, filenames = [] } = application;
    const newUser = await this.saveUser({
      businessUEN,
      businessName,
      fullname,
      position,
      mobile,
      email,
      fileName: filenames[0]
    } as Applicant);

    const userId = newUser.id;
    const files = filenames.map(file => ({ userId, filename: file }))
    await this.documentService.saveDocuments(files);

    const { termsAndConditions } = application
    await this.conditionService.saveConditions(userId, termsAndConditions);

    return newUser;
  }

  getApplicant() {
    try {
      return this.applicantRepository.find();
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
