import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TermsAndConditions } from '../entities/conditions.entity';
import { IConditions } from '../interfaces/application.request';

@Injectable()
export class ConditionService {
    constructor(
        @InjectRepository(TermsAndConditions)
        private conditionRepository: Repository<TermsAndConditions>,
    ) { }

    async saveConditions(userId: number, termsAndConditions: IConditions) {
        const conditions = termsAndConditions.conditions;
        const active = termsAndConditions.active;

        const conditionsMark = {
            userId,
            conditionOne: conditions?.one,
            conditionOneActive: active?.one
        }

        return await this.conditionRepository.save(conditionsMark);
    }

}
