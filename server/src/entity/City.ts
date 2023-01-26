import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()

class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true, length: 100 })
    Photo: string;
}

export default City;