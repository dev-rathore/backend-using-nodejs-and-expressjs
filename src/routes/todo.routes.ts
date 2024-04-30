import express from "express";
import todoController from "../controllers/todo.controller";

const router = express.Router();

// /api/todos

router.post("/", todoController.createTodo);
router.get("/", todoController.getTodos);
router.get("/:id", todoController.getTodoById);
router.patch("/:id", todoController.updateTodo);

export default router;
