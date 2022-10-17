import { Response, Request } from "express";
import { QueryResult } from "pg";
import { db } from "../database/database";
import Kanban from "../models/kanbanmodel";

export class KanbanController {
  public async getKanbans(req: Request, res: Response) {
    const kanbans = await db.query('SELECT * from "public"."kanban"');
    res.status(200).send(kanbans[0]);
  }
  public async createKanban(req: Request, res: Response) {
    const { name } = req.body;
    const kanban = await db
      .query(`insert into "public"."kanban"(name) values ('${name}')`)
      .catch((error) => console.log(error));
    res.status(200).send(`Kanban ${kanban} was created`);
  }
  public async getKanbanTasks(req: Request, res: Response) {
    const tasks: any = await db
      .query(
        `select * from public."columns" c join public.kanban k on c.kanban_id = k.id join public.tasks t on t.column_id = c.id where c.kanban_id =2;`
      )
      .catch((error) => res.status(400).send(error));
    res.status(200).send(tasks[0]);
  }
}
