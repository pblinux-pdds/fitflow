import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    plan: string;
}
