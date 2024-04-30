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

    const todoResponse = await newTodo.save();

    res.status(201).json({
      message: "Todo created successfully",
      data: {
        completed: todoResponse.completed,
        id: todoResponse._id,
        description: todoResponse.description,
        title: todoResponse.title,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating todo",
    });
  }
}

const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();

    res.json({
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching todos",
    });
  }
}

const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Id is required",
      });
    }

    const todo = await Todo.findById({
      _id: id,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json({
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching todo",
    });
  }
}

const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const existingTodoWithSameTitle = await Todo.findOne({
      title,
    });

    if (existingTodoWithSameTitle) {
      return res.status(400).json({
        message: "Todo with this title already exists",
      });
    }

    if (!id) {
      return res.status(400).json({
        message: "Id is required",
      });
    }
    
    if (!title && !description) {
      return res.status(400).json({
        message: "Title or Description is required",
      });
    }

    const existingTodo = await Todo.findById(id);

    if (!existingTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    existingTodo.title = title;
    existingTodo.description = description;
    existingTodo.completed = completed;

    await existingTodo.save();

    res.json({
      message: "Todo updated successfully",
      data: {
        completed,
        description,
        title,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating todo",
    });
  }
}

export default {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
};
