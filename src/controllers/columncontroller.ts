import { Response, Request } from "express";
import { db } from "../database/database";

export class ColumnController {
  public async getKanbanColumns(req: Request, res: Response) {
    const id = req.params.kanbanID;
    const columns: any = await db
      .query(
        `SELECT * FROM "public"."tasks" t inner JOIN "public"."columns" c ON t.column_id = c.id where column_id =${id}`
      )
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
    res.status(200).send(columns[0]);
  }
}
