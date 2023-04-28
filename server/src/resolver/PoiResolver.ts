import {Arg, Authorized, Int, Mutation, Query, Resolver} from "type-graphql";
import Poi, {PoiInput, UpdatePoiInput} from "../entity/Poi";
import datasource from "../db";
import {ApolloError} from "apollo-server-errors";
import {UserRole} from "../entity/User";


@Resolver(Poi)
export class PoiResolver {
    @Query(() => [Poi])
    async Pois(): Promise<Poi[]> {
        return await datasource.getRepository(Poi).find({relations: {city: true}});
    }

    @Authorized<UserRole>([UserRole.SUPERADMIN, UserRole.CITYADMIN, UserRole.POICREATOR])
    @Mutation(() => Poi)
    async createPoi(@Arg("data") data: PoiInput): Promise<String> {
        await datasource.getRepository(Poi).save(data);
        return `New point of interest created`;
    }

    @Authorized<UserRole>([UserRole.SUPERADMIN, UserRole.CITYADMIN])
    @Mutation(() => Boolean)
    async deletePoi(@Arg("id", () => Int) id: number): Promise<String> {
        const {affected} = await datasource.getRepository(Poi).delete(id);
        if (affected === 0) throw new ApolloError("User not found", "NOT_FOUND");
        return `${affected} has been removed`;
    }

    @Authorized<UserRole>([UserRole.SUPERADMIN, UserRole.CITYADMIN])
    @Mutation(() => String)
    async updatePoi(
        @Arg("id", () => Int) id: number,
        @Arg("data") data: UpdatePoiInput): Promise<string> {
        const {affected} = await datasource
            .getRepository(Poi)
            .update(id, data);

        if (affected === 0) throw new ApolloError("Poi not found", "NOT_FOUND");

        return "Poi updated";
    }
}
