import {ApolloError} from "apollo-server-errors";
import {Arg, Mutation, Query, Resolver} from "type-graphql";
import datasource from "../db";
import User, {hashPassword, UserInput, verifyPassword} from "../entity/User";

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    async users(): Promise<User[]> {
        return await datasource.getRepository(User).find();
    }

    @Mutation(() => User)
    async createUser(@Arg("data") data: UserInput): Promise<User> {
        const hashedPassword = await hashPassword(data.password);
        const user = await datasource
            .getRepository(User)
            .save({...data, hashedPassword});
        return user;
    }

    @Mutation(() => String)
    async login(@Arg("data") data: UserInput): Promise<string> {
        const user = await datasource
            .getRepository(User)
            .findOne({where: {email: data.email}});
        const hashedPassword = await hashPassword(data.password);

        if (
            user === null ||
            typeof user.hashedPassword !== "string" ||
            !(await verifyPassword(data.password, user.hashedPassword))
        )
            throw new ApolloError("invalid credentials");
        else {
            return "ok";
        }
    }
}
