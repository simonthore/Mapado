"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const type_graphql_1 = require("type-graphql");
const CityResolver_1 = require("./resolver/CityResolver");
const UserResolver_1 = require("./resolver/UserResolver");
const env_1 = require("./env");
const apollo_server_core_1 = require("apollo-server-core");
const http = __importStar(require("http"));
// @Resolver()
// class CityResolver {
//     // private citiesCollection: City[] = [];
//
//     @Query(() => String, {name: "helloworld"})
//     async hello() {
//         return "hello world";
//     }
// }
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.initialize();
    const app = (0, express_1.default)();
    const httpServer = http.createServer(app);
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [CityResolver_1.CityResolver, UserResolver_1.UserResolver],
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
        ],
        // https://www.apollographql.com/docs/apollo-server/v3/security/authentication/#putting-authenticated-user-info-on-the-context
        context: ({ req, res }) => {
            return { req, res };
        },
    });
    console.log("Hello World");
    const allowedOrigins = env_1.env.CORS_ALLOWED_ORIGINS.split(",");
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({
        credentials: true,
        origin: (origin, callback) => {
            if (typeof origin === "undefined" || allowedOrigins.includes(origin))
                return callback(null, true);
            callback(new Error("Not allowed by CORS"));
        },
    }));
    app.get("/", (req, res) => {
        res.send("<h1>Bienvenue sur City Simononio</h1>");
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false, path: "/" });
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`App listening on port ${port}/graphql`);
    });
});
void start();
