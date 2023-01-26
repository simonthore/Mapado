import {Resolver, Query, Mutation, Arg} from "type-graphql"
import datasource from "../db";
import {ApolloError} from "apollo-server-errors";
import City from "../entity/City";
import {promises} from "dns";

@Resolver()
export class CityResolver {
    @Query(() => [City])
    async cities(): Promise<City[]> {
        const cities = await datasource
            .getRepository(City)
            .find();

        return cities.map((c) => ({
            ...c,
            name: c.name
        }))
    }

    @Mutation(() => String)
    async register(
        @Arg("name") name: string
    ) {
        return name;
    }
}