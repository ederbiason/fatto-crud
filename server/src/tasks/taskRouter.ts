// taskRouter.ts
import { Router, Request, Response } from 'express';
import TaskController from './taskController';
import { Task } from '../models/Tasks';

export default function taskRouter(taskController: TaskController) {
    const router = Router();

    router.get('/tasks', async (req: Request, res: Response) => {
        try {
            const tasks = await taskController.getTasks();
            res.json(tasks);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    router.post('/tasks', async (req: Request, res: Response) => {
        const { nome, custo, data_limite } = req.body;
        try {
            const task: Task = { nome, custo, data_limite };
            const createdTask = await taskController.createTask(task);
            res.status(201).json(createdTask);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

    router.put('/tasks/:id', async (req: Request, res: Response) => {
        const { nome, custo, data_limite } = req.body;
        const id = Number(req.params.id);
        try {
            const task: Task = { nome, custo, data_limite };
            const updatedTask = await taskController.updateTask(id, task);
            res.json(updatedTask);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

    router.delete('/tasks/:id', async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        try {
            await taskController.deleteTask(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });

    return router;
}
