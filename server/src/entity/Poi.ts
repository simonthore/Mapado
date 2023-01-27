import { PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Category from "./Category";

class Poi {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    name: string;

    @Column()
    gps_coordinates: number;

    @Column({ length: 100 })
    customize_gps_marker: string;

    @Column({ length: 100 })
    address: string;

    @Column({ length: 500 })
    description: string;

    @Column({ nullable: true, length: 100 })
    photo: string;

    @Column({ nullable: true, length: 3 })
    rating: number;

    @Column({ nullable: true, length: 250 })
    comments: string;


    // pas sur du type ni de la cohérence 
    @Column()
    audio: string;

    @Column({ nullable: true, length: 200 })
    website: string;

    @Column({ length: 10 })
    phone: number;

    @Column()
    categoryId: number;

    //Potentiellement à implémenter
    // @Column()
    // email: string;

    // @Column()
    // opening_hours: string;

    @OneToMany(() => Category, (c) => c.poi)
    category: Category;
}

export default Poi;