import express from "express";
import todoController from "../controllers/todo.controller";

const router = express.Router();

// /api/todos

router.post("/", todoController.createTodo);

export default router;
