
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface AssignWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutName: string;
}

const mockStudents: Student[] = [
  { id: 1, name: "Ana Silva", email: "ana@email.com", age: 28 },
  { id: 2, name: "Carlos Santos", email: "carlos@email.com", age: 35 },
  { id: 3, name: "Mariana Costa", email: "mariana@email.com", age: 22 },
  { id: 4, name: "João Pedro", email: "joao@email.com", age: 31 },
  { id: 5, name: "Fernanda Lima", email: "fernanda@email.com", age: 26 },
];

export function AssignWorkoutModal({ isOpen, onClose, workoutName }: AssignWorkoutModalProps) {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const { toast } = useToast();

  const handleStudentSelect = (studentId: number, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === mockStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(mockStudents.map(student => student.id));
    }
  };

  const handleAssignWorkout = () => {
    if (selectedStudents.length === 0) {
      toast({
        title: "Nenhum aluno selecionado",
        description: "Selecione pelo menos um aluno para atribuir o treino.",
        variant: "destructive",
      });
      return;
    }

    const selectedStudentNames = mockStudents
      .filter(student => selectedStudents.includes(student.id))
      .map(student => student.name);

    toast({
      title: "Treino atribuído com sucesso!",
      description: `O treino "${workoutName}" foi atribuído a ${selectedStudentNames.length} aluno(s).`,
    });

    setSelectedStudents([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Atribuir Treino: {workoutName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Selecione os alunos que receberão este treino
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSelectAll}
              className="rounded-xl"
            >
              {selectedStudents.length === mockStudents.length ? "Desmarcar Todos" : "Selecionar Todos"}
            </Button>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-3">
            {mockStudents.map((student) => (
              <div key={student.id} className="flex items-center space-x-3 p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <Checkbox
                  id={`student-${student.id}`}
                  checked={selectedStudents.includes(student.id)}
                  onCheckedChange={(checked) => handleStudentSelect(student.id, checked as boolean)}
                />
                
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-indigo-100 text-indigo-900">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">{student.name}</h4>
                  <p className="text-sm text-slate-600">{student.email}</p>
                  <p className="text-xs text-slate-500">{student.age} anos</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="w-4 h-4" />
              {selectedStudents.length} de {mockStudents.length} alunos selecionados
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="rounded-xl">
                Cancelar
              </Button>
              <Button 
                onClick={handleAssignWorkout}
                className="bg-indigo-900 hover:bg-indigo-800 rounded-xl"
              >
                Atribuir Treino
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
