import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

export const db = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
