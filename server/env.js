"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnv = exports.env = exports.schema = void 0;
const ts_dotenv_1 = require("ts-dotenv");
exports.schema = {
    NODE_ENV: ['production', 'development'],
    SERVER_PORT: Number,
    SERVER_HOST: String,
    CORS_ALLOWED_ORIGINS: String,
    POSTGRES_PASSWORD: String,
    POSTGRES_USER: String,
    POSTGRES_DB: String,
    DB_HOST: { type: String, optional: true },
};
function loadEnv() {
    exports.env = (0, ts_dotenv_1.load)(exports.schema);
}
exports.loadEnv = loadEnv;
