<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
=======
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
>>>>>>> origin
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
<<<<<<< HEAD
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
=======
    @Column()
    name: string;

    @Field({nullable: true})
    @Column({nullable: true, type: "text"})
    image?: string;
}
>>>>>>> origin
