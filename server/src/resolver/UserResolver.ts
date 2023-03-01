import { ApolloError } from "apollo-server-errors";
import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import datasource from "../db";
import User, {
  getSafeAttributes,
  hashPassword,
  Role,
  UserChangePassword,
  UserInput,
  UserSendPassword,
  verifyPassword,
} from "../entity/User";
import { env } from "../environment";
import { ContextType } from "../index";
import { stringify } from "querystring";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await datasource.getRepository(User).find();
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    const hashedPassword = await hashPassword(data.password);
    const createdAt = await Date.now();
    const user = await datasource
      .getRepository(User)
      .save({ ...data, createdAt, hashedPassword });
    return user;
  }

  @Authorized<Role>(["cityAdmin"])
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
    return "logged out";
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() ctx: ContextType): Promise<User> {
    return getSafeAttributes(ctx.currentUser as User);
  }

  @Mutation(() => User)
  async sendPasswordEmail(@Arg("data") data: UserSendPassword): Promise<User> {
    const { email } = data;

    const userToEmail = await datasource
      .getRepository(User)
      .findOne({ where: { email } });

    if (!userToEmail) throw new ApolloError("invalid credentials");

    // sender information used to authenticate
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "mapado-wns@outlook.com",
        pass: "projetMapado",
      },
      from: "mapado-wns@outlook.com",
    });

    // const createEmailToken = (): string => {
    const userId = userToEmail.id;
    const hashedPassword = userToEmail.hashedPassword;
    const createdAt = userToEmail.created_at;
    const secret = hashedPassword + "-" + createdAt;

    const emailToken = jwt.sign({ userId }, secret, { expiresIn: 36000 });

    try {
      // create token
      const url = `http://localhost:3000/password/reset/:${emailToken}`;

      //  send password reset email
      await transporter.sendMail({
        from: "Mapado Team mapado-wns@outlook.com",
        to: email,
        subject: "Mapado reset password",
        html: `Hi ${email}, we received a request to reset your password. Please click the following link to reset your password.: <a href="${url}">${url}</a>`,
        text: `Hi ${email}, we received a request to reset your password. Please click the following link to reset your password.: <a href="${url}">${url}</a>`,
      });
    } catch (e) {
      console.log(e);
    }

    // add token to user in db
    userToEmail.changePasswordToken = emailToken;

    // save token in db
    await datasource.getRepository(User).save(userToEmail);

    return userToEmail;
  }

  // // Query to fetch and send changeEmailToken to client

  @Query(() => User)
  async fetchToken(@Arg("email", () => String) email: string): Promise<User> {
    const userToUpdatePassword = await datasource
      .getRepository(User)
      .findOne({ where: { email } });
    if (userToUpdatePassword === null)
      throw new ApolloError("user not found", "NOT_FOUND");
    return userToUpdatePassword;
  }

  // mutation to change password
  @Mutation(() => User)
  async changePassword(
    // @Arg('id', () => Int) id: number,
    @Arg("data") data: UserChangePassword
  ): Promise<boolean> {
    // deconstruct data from User entity
    const { email, newPassword } = data;

    //create userToUpdate which is the user in the db matching the email (with properties email, hashedPassword, etc)
    const userToUpdate = await datasource
      .getRepository(User)
      .findOne({ where: { email } });
    // verify if user is null > throw error
    if (!userToUpdate)
      throw new ApolloError("invalid credentials no such user");

    // match UserSendPassword token to token in headers
    if (!userToUpdate.changePasswordToken)
      throw new ApolloError("invalid credentials no such token");

    // hash new password
    const newHashedPassword = await hashPassword(newPassword);

    // update password in user data
    userToUpdate.hashedPassword = newHashedPassword;

    // save new password in db
    await datasource.getRepository(User).save(userToUpdate);

    return true;
  }
}
