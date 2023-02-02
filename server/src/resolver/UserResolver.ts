import { ApolloError } from "apollo-server-errors";
import { verify } from "crypto";
import { Arg, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";
import datasource from "../db";
import User, {
  getSafeAttributes,
  hashPassword,
  Role,
  UserInput,
  verifyPassword,
} from "../entity/User";
import { env } from "../environment";
import { ContextType } from "../index";

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
      .save({ ...data, hashedPassword });
    return user;
  }

  @Authorized<Role>(['admin'])
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id", () => Int) id: number): Promise<boolean> {
    const { affected } = await datasource.getRepository(User).delete(id);
    if (affected === 0) throw new ApolloError("user not found", "NOT_FOUND");
    return true;
  }


  @Mutation(() => String)
  async login(
    @Arg("data") { email, password }: UserInput,
    @Ctx() ctx: ContextType
  ): Promise<string> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email } });
    // const hashedPassword = await hashPassword(password);

    if (
      user === null ||
      !user.hashedPassword ||
      !(await verifyPassword(password, user.hashedPassword))
    ) {
      throw new ApolloError("invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    ctx.res.cookie("token", token, {
      secure: env.NODE_ENV === "production",
      domain: env.SERVER_HOST,
      httpOnly: true,
    });

    return token;
  }

  @Mutation(() => String)
  async logout(@Ctx() ctx: ContextType) {
    ctx.res.clearCookie("token");
    return 'logged out';
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType): Promise<User> {
    return getSafeAttributes(ctx.currentUser as User);
  }
}
