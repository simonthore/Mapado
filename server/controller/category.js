"use strict";
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
exports.loadEnv = exports.env = exports.schema = void 0;
const ts_dotenv_1 = require("ts-dotenv");
exports.schema = {
    NODE_ENV: ['production', 'development'],
    SERVER_PORT: Number,
    SERVER_HOST: String,
    POSTGRES_PASSWORD: String,
    POSTGRES_USER: String,
    POSTGRES_DB: String,
    DB_HOST: { type: String, optional: true },
};
function loadEnv() {
    exports.env = (0, ts_dotenv_1.load)(exports.schema);
}
exports.loadEnv = loadEnv;
const db_1 = __importDefault(require("../db"));
const Category_1 = __importDefault(require("../entity/Category"));
const categoryController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = req.body;
        if (name.length > 100 || name.length === 0) {
            return res
                .status(400)
                .send('Name must be between 1 and 100 characters');
        }
        try {
            const created = yield db_1.default.getRepository(Category_1.default).save({ name });
            res.status(201).send(created);
        }
        catch (err) {
        }
        res.status(err).send('error while creating category');
    }),
};
exports.default = categoryController;
