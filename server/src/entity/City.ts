import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Field, InputType, ObjectType} from "type-graphql";


@InputType()
export class CityInput {
    @Field()
    name: string;
    @Field()
    image?: string;
}

@Entity()
@ObjectType()
export default class City {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({ nullable: true, length: 100 })
    @Field()
    Photo?: string;

    @Column( { nullable: true })
    @Field( { nullable: true })
    City_area?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    userId?: number;

};
