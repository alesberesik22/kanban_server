import express, { Express, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import kanbanRoutes from "./routes/kanbanroutes";
import columnRoutes from "./routes/columnroutes";
import { db } from "./database/database";

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded());
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/kanban", kanbanRoutes);
app.use("/columns", columnRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  db.authenticate()
    .then(() => {
      console.log("Database connected");
    })
    .catch((error: any) => {
      console.log(error.message);
    });
});
