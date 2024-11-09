// TaskDialog.tsx
import { Task } from "@/App"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"

interface TaskDialogProps {
  task?: Task
  onSave: (task: Task) => void
  onClose: () => void
}

export function TaskDialog({ task, onSave, onClose }: TaskDialogProps) {
  const [nome, setNome] = useState(task?.nome || "")
  const [custo, setCusto] = useState(task?.custo || 0)
  const [dataLimite, setDataLimite] = useState(task?.data_limite || "")

  useEffect(() => {
    if (task) {
      setNome(task.nome)
      setCusto(task.custo)
      setDataLimite(task.data_limite)
    }
  }, [task])

  const handleSave = () => {
    if (nome && custo && dataLimite) {
      onSave({ id: task?.id, nome, custo, data_limite: dataLimite })
    }
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Editar tarefa" : "Adicionar tarefa"}</DialogTitle>
          <DialogDescription>{task ? "Edite os detalhes da tarefa" : "Crie uma nova tarefa"}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5 mb-3">
          <div>
              <Label htmlFor="nome">Nome da Tarefa</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
          </div>

          <div>
              <Label htmlFor="custo">Custo (R$)</Label>
              <Input
                id="custo"
                type="number"
                value={custo}
                onChange={(e) => setCusto(parseFloat(e.target.value))}
              />
          </div>

          <div>
              <Label htmlFor="data_limite">Data Limite</Label>
              <Input
                id="data_limite"
                type="date"
                value={dataLimite}
                onChange={(e) => setDataLimite(e.target.value)}
              />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>{task ? "Salvar" : "Adicionar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
