import express, { Express } from "express";
import { KanbanController } from "../controllers/kanbancontroller";
const router = express.Router();
const kanbanController = new KanbanController();

router.get("/kanbans", kanbanController.getKanbans);
router.get("/kanbantasks/:kanbanID", kanbanController.getKanbanTasks);
router.post("/createkanban", kanbanController.createKanban);

export = router;
