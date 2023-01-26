import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import http from "http";
import cors from "cors";
import datasource from "./db";
import {buildSchema} from "type-graphql";
import {CityResolver} from "./resolver/CityResolver";
import {ApolloServer} from "apollo-server-express";
import { env } from "./env";


export interface ContextType {
  req: express.Request;
  res: express.Response;
}

const start = async (): Promise<void> => {
  await datasource.initialize();

  const app = express();
  const httpServer = http.createServer(app);
  const allowedOrigins = env.CORS_ALLOWED_ORIGINS.split(",");

  app.use(
      cors({
        credentials: true,
        origin: (origin, callback) => {
          if (typeof origin === "undefined" || allowedOrigins.includes(origin))
            return callback(null, true);
          callback(new Error("Not allowed by CORS"));
        },
      })
  );

  const schema = await buildSchema({
    resolvers: [CityResolver],})

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    // https://www.apollographql.com/docs/apollo-server/v3/security/authentication/#putting-authenticated-user-info-on-the-context
    context: ({ req, res }) => {
      return { req, res };
    },
  });

  await server.start();
  server.applyMiddleware({ app, cors: false, path: "/" });
  httpServer.listen({ port: env.SERVER_PORT }, () =>
      console.log(
          `🚀 Server ready at ${env.SERVER_HOST}:${env.SERVER_PORT}${server.graphqlPath}`
      )
  );
}








// console.log("Hello World");
// const app: Express = express();
//
// app.use(express.json());
// app.use(cors());
//
// app.get("/", (req: Request, res: Response) => {
//   res.send("<h1>Bienvenue sur City Simononio</h1>");
// });
//
// const port = process.env.PORT || 4000;
//
// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });
