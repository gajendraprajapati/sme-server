import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserDocs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    filename: string;

    @CreateDateColumn()
    createdDate: string;

    @UpdateDateColumn()
    updatedDate: string
}