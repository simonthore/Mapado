import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import City from './City';

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Role_id: number;

    @Column()
    City_id: number;

    @Column({ length: 25 })
    Username: string;

    @Column({ length: 20 })
    Password: string;

    @Column({ length: 50 })
    Email: string;

    @Column()
    Rights: string;

    @Column()
    @OneToMany(() => City, (c) => c.user)
    city: City;
}

export default User;