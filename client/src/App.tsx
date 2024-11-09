import axios from "axios"
import { useEffect, useState } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react";
import moment from "moment";
import { TaskDialog } from "./components/TaskDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./components/ui/button"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

export interface Task {
  id?: number;
  nome: string;
  custo: number;
  data_limite: string;
  ordem_apresentacao?: number;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined)
  const [showDialog, setShowDialog] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<Task | undefined>(undefined)

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/tasks")

      setTasks(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task)
    setShowDialog(true)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
  }

  const handleDeleteTask = async () => {
    if (taskToDelete?.id) {
      try {
        await axios.delete(`http://localhost:3000/api/tasks/${taskToDelete.id}`)
        getTasks()
      } catch (error: any) {
        console.error(error)
      }
      setShowConfirmDialog(false)
    }
  }

  const handleConfirmDelete = (task: Task) => {
    setTaskToDelete(task)
    setShowConfirmDialog(true)
  }

  const handleCancelDelete = () => {
    setShowConfirmDialog(false)
  }

  const handleSaveTask = async (task: Task) => {
    try {
      if (task.id) {
        await axios.put(`http://localhost:3000/api/tasks/${task.id}`, task)
      } else {
        await axios.post("http://localhost:3000/api/tasks", task)
      }
      setShowDialog(false)
      getTasks()
    } catch (error: any) {
      console.error(error)
    }
  }

  function reorder(list: Task[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  function onDragEnd(result: any) {
    if (!result.destination) return

    const items = reorder(tasks, result.source.index, result.destination.index)

    setTasks(items)
  }

  return (
    <div className="flex flex-col gap-5 w-full h-full items-center justify-center p-20">
      <h1 className="mb-3 font-bold text-5xl uppercase">Tarefas</h1>

      <Button
        variant="outline"
        onClick={() => {
          setTaskToEdit(undefined)
          setShowDialog(true)
        }}
      >
        <Plus size={20} />
        Adicionar Tarefa
      </Button>

      <div className="w-[650px] p-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks" type="list" direction="vertical">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-5">
                {tasks.map((task: Task, index) => (
                  <Draggable draggableId={task.id!.toString()} index={index} key={task.id} >
                    {(provided) => (
                      <article
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`w-full ${task.custo >= 1000 ? "bg-yellow-200" : "bg-white"} p-5 flex items-center justify-between rounded-lg border-2 shadow-md`}
                        ref={provided.innerRef}
                      >
                        <div className="flex flex-col gap-3">
                          <h2 className="text-xl font-semibold">{task.nome}</h2>

                          <div className="flex flex-col gap-2">
                            <p><span className="font-semibold">Custo:</span> {(task.custo).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                            <p><span className="font-semibold">Data limite:</span> {moment(task.data_limite).format("DD/MM/YYYY")}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="p-2 w-fit rounded-full hover:bg-blue-400 transition-colors" onClick={() => handleEditTask(task)} >
                            <Pencil size={24} />
                          </div>

                          <div className="p-2 w-fit rounded-full hover:bg-red-400 transition-colors" onClick={() => handleConfirmDelete(task)}>
                            <Trash2 size={24} />
                          </div>
                        </div>
                      </article>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={(open) => !open && setShowConfirmDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja excluir esta tarefa? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDelete}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteTask}>
              Sim, excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showDialog && <TaskDialog task={taskToEdit} onSave={handleSaveTask} onClose={handleCloseDialog} />}
    </div>
  )
}
