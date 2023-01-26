import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import City from "./City";
import { IsEmail, Matches, MinLength } from "class-validator";
import { argon2id, hash, verify } from "argon2";
import { userInfo } from "os";

@Entity()
@ObjectType()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  role_id: number;

  @Field()
  @Column()
  city_id: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  hasedPassword?: string;

  @Field()
  @Column({ enum: ["visitor", "cityAdmin", "SuperAdmin"], default: "visitor" })
  role: Role;

  @Column()
  @OneToMany(() => City, (c) => c.user)
  city: City;
}

@InputType()
export class UserInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(8)
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    password: string;
}

const hashingOptions = {
    memoryCost: 2 ** 16,
    timeCost: 5,
    type: argon2id,
}

export const hashedPassword = async (plainPassword: string): Promise<string> => 
await hash(plainPassword, hashingOptions);

export const verifyPassword = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> => 
    await verify(hashedPassword, plainPassword, hashingOptions);

export const getSafeAttributes = (use: User) => ({
    ...userInfo,
    hashedPassword: undefined
});

export default User;
