import express, { Express, Request, Response } from "express";
import cors from "cors";

console.log("Hello World");
const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Bienvenue sur City Simononio</h1>");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
