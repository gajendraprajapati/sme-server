import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TermsAndConditions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    conditionOne: string;

    @Column()
    conditionOneActive: boolean;

    @CreateDateColumn()
    createdDate: string;

    @UpdateDateColumn()
    updatedDate: string
}