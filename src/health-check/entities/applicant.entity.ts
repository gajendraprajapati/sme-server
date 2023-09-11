
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Applicant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    businessUEN: string;

    @Column()
    businessName: string;

    @Column()
    fullname: string;

    @Column()
    position: string;

    @Column()
    mobile: string;

    @Column()
    email: string;

    @Column()
    fileName: string;

    @CreateDateColumn()
    createdDate: string;

    @UpdateDateColumn()
    updatedDate: string
}