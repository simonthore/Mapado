import express, { Express, Request, Response } from "express";
import cors from "cors";


console.log('Hello World')
const app: Express = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Bienvenue sur City Simon</h1>')
});

const port = process.env.PORT ||8000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
