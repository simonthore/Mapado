"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const env_1 = require("./env");
const City_1 = __importDefault(require("./entity/City"));
const User_1 = __importDefault(require("./entity/User"));
(0, env_1.loadEnv)();
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    entities: [City_1.default, User_1.default],
    logging: ["error"],
});
