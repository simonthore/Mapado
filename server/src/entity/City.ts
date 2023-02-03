import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany} from "typeorm";
import {Field, Float, InputType, ObjectType} from "type-graphql";
import User from "./User"
import Poi from "./Poi"

@InputType()
export class CityInput{
    @Field()
    name: string;

    @Field({ nullable: true })
    image?: string;

    @Field(()=>Float, {nullable: true})
    longitude?: number;

    @Field(()=>Float, {nullable: true})
    latitude?: number;
}

@Entity()
@ObjectType()
export default class City {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field({nullable: true})
    @Column({nullable: true, type: "text"})
    image?: string;

    @Field(()=>Float, {nullable: true})
    @Column({nullable: true, type: "int"})
    latitude?: number;

    @Field(()=>Float, {nullable: true})
    @Column({nullable: true, type: "int"})
    longitude?: number;

    @Field(()=>[User],{nullable: true})
    @ManyToMany(() => User, (u) => u.cities, {cascade: true,})
    users?: User[];

    @Field(()=>[Poi],{nullable: true})
    @OneToMany(() => Poi, (p) => p.cities, {cascade: true,})
    poi?: Poi[];
}
