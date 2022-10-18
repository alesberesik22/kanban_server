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
    const { kanban_name } = req.body;
    const kanban = await db
      .query(
        `insert into "public"."kanban"(kanban_name) values ('${kanban_name}')`
      )
      .catch((error) => {
        res.status(400).send(error);
        console.log(error);
      });
    res.status(200).send(`Kanban ${kanban} was created`);
  }
  public async getKanbanTasks(req: Request, res: Response) {
    const id = req.params.kanbanID;
    let arr6: Array<{ id: number; name: string; items: [] }> = Array();
    const columns: any = await db
      .query(
        `select c2.column_id, c2.column_name  from public."columns" c2 join public.kanban k on c2.kanban_id = k.kanban_id where k.kanban_id =${id};`
      )
      .catch((error) => res.status(400).send(error));
    for (let column of columns[0]) {
      const tasks: any = await db.query(
        `select t.task_id ,t.task_title ,t.task_content ,t.task_priority  from public.tasks t inner join public."columns" c on t.task_column_id  = c.column_id  where c.column_id  =${column.column_id};`
      );
      arr6.push({
        id: column.column_id,
        name: column.column_name,
        items: tasks[0],
      });
    }
    res.status(200).send(arr6);
  }
  public async getKanbanColumnTasks() {
    const tasks = await db.query(
      `select t.id,t.title,t."content",t.priority  from public.tasks t inner join public."columns" c on t.column_id = c.id where c.id =2;`
    );
    return tasks;
  }
}
