import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Bienvenue sur City Guide</h1>')
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
