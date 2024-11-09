import { Database, Statement } from 'sqlite';
import { Task } from '../models/Tasks';

class TaskController {
    constructor(private db: Database) { }

    async createTask(task: Task): Promise<Task> {
        const { nome, custo, data_limite } = task;
      
        const sqlMaxOrdem = 'SELECT MAX(ordem_apresentacao) AS maxOrdem FROM tasks';
        const result = await this.db.get(sqlMaxOrdem);
      
        const ordem_apresentacao = (result?.maxOrdem ?? 0) + 1; 
      
        const sql = 'INSERT INTO tasks (nome, custo, data_limite, ordem_apresentacao) VALUES (?, ?, ?, ?)';
        const insertResult = await this.db.run(sql, [nome, custo, data_limite, ordem_apresentacao]);
      
        if (insertResult.lastID) {
          const createdTask = await this.getTaskById(insertResult.lastID);
          if (!createdTask) {
            throw new Error('Falha na busca ou criação da tabela');
          }
          return createdTask;
        } else {
          throw new Error('Falha na criação da tarefa');
        }
      }

    async getTaskById(id: number): Promise<Task | undefined> {
        const sql = 'SELECT * FROM tasks WHERE id = ?';
        const row = await this.db.get(sql, [id]);
        return row as Task | undefined;
    }

    async getTasks(): Promise<Task[]> {
        const sql = 'SELECT id, nome, custo, data_limite FROM tasks ORDER BY ordem_apresentacao';
        return await this.db.all(sql);
    }

    async updateTask(id: number, updatedTask: Task): Promise<Task | undefined> {
        const { nome, custo, data_limite } = updatedTask;
        const sql = 'UPDATE tasks SET nome = ?, custo = ?, data_limite = ? WHERE id = ?';

        const result = await this.db.run(sql, [nome, custo, data_limite, id]);
        if ((result.changes ?? 0) > 0) {
            return updatedTask;
        } else {
            throw new Error('Tarefa não encontrada ou falha no update');
        }
    }

    async deleteTask(id: number): Promise<void> {
        const sql = 'DELETE FROM tasks WHERE id = ?';
        const result = await this.db.run(sql, [id]);
        if ((result.changes ?? 0) === 0) {
            throw new Error('Tarefa não encontrada ou falha na remoção');
        }
    }
}

export default TaskController;
