import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import datasource from "./db";
// import { env } from "./env";
import { buildSchema, Resolver, Query } from "type-graphql";

@Resolver()
class CityResolver {
  // private citiesCollection: City[] = [];

  @Query(() => String, { name: "helloworld" })
  async hello() {
    return await "hello world";
  }
}

const start = async () => {
  await datasource.initialize();

  const schema = await buildSchema({
    resolvers: [CityResolver],
  });

  const apolloServer = new ApolloServer({ schema });

  console.log("Hello World");
  const app: Express = express();

  app.use(express.json());
  app.use(cors());

  app.get("/", (req: Request, res: Response) => {
    res.send("<h1>Bienvenue sur City Simononio</h1>");
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`App listening on port ${port}/graphql`);
  });
};
start();