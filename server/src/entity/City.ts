import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Field, InputType, ObjectType} from "type-graphql";


@InputType()
export class CityInput {
    @Field()
    name: string;
}

@Entity()
@ObjectType()
export class City {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    User_id?: number;

    @Column()
    @Field()
    name: string;

    @Column({ nullable: true, length: 100 })
    @Field()
    Photo?: string;

    @Column()
    @Field()
    City_area?: string;

    @Column()
    @Field()
    userId?: number;

}

export default City;
