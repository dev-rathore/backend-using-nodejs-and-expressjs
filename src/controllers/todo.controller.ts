import { Request, Response } from 'express';
import Todo from '../models/todo.model';

const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const existingTodoByTitle = await Todo.findOne({
      title,
    });

    if (existingTodoByTitle) {
      return res.status(400).json({
        message: "Todo with this title already exists",
      });
    }

    const newTodo = new Todo({
      title,
      description,
    });

    await newTodo.save();

    res.status(201).json({
      message: "Todo created successfully",
      data: {
        title,
        description,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating todo",
    });
  }
};

export default {
  createTodo,
};
