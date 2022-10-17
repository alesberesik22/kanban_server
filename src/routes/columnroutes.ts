import express from "express";
import { ColumnController } from "../controllers/columncontroller";
const columnController = new ColumnController();
const router = express.Router();

router.get(`/:kanbanID`, columnController.getKanbanColumns);

export = router;
