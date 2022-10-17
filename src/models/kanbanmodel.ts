import { Column, Table, Model, DataType } from "sequelize-typescript";

export interface KanbanI {
  id: number;
  name: string;
}
@Table({
  tableName: "kanban",
})
export default class Kanban extends Model implements KanbanI {
  @Column({ type: DataType.INTEGER })
  id!: number;
  @Column({ type: DataType.STRING })
  name!: string;
}
