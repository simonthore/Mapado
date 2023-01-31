import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
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
