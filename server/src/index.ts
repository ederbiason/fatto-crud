import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path'
import cors from 'cors'
import TaskController from './tasks/taskController';
import taskRouter from './tasks/taskRouter';

const app = express()
const port = 3000;

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

(async () => {
    const db = await open({
        filename: path.join(__dirname, 'db', 'database.db'),
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL UNIQUE,
          custo REAL NOT NULL,
          data_limite TEXT NOT NULL,
          ordem_apresentacao INTEGER NOT NULL DEFAULT 1
        );
      `)

    const taskController = new TaskController(db);

    app.use(express.json());
    app.use('/api', taskRouter(taskController));

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})()