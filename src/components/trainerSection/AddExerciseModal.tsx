
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Play, Dumbbell } from "lucide-react";

interface Exercise {
  id: number;
  name: string;
  category: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
  description: string;
  videoUrl?: string;
}

interface AddExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExercise: (exercise: Exercise) => void;
}

const mockExercises: Exercise[] = [
  {
    id: 1,
    name: "Supino Reto",
    category: "Peito",
    muscleGroup: "Peitoral",
    equipment: "Barra",
    difficulty: "Intermediário",
    description: "Exercício básico para desenvolvimento do peitoral",
    videoUrl: "#"
  },
  {
    id: 2,
    name: "Agachamento Livre",
    category: "Pernas",
    muscleGroup: "Quadríceps",
    equipment: "Barra",
    difficulty: "Avançado",
    description: "Exercício fundamental para membros inferiores",
    videoUrl: "#"
  },
  {
    id: 3,
    name: "Flexão de Braço",
    category: "Peito",
    muscleGroup: "Peitoral",
    equipment: "Peso Corporal",
    difficulty: "Iniciante",
    description: "Exercício básico usando peso corporal",
    videoUrl: "#"
  },
  {
    id: 4,
    name: "Rosca Direta",
    category: "Braços",
    muscleGroup: "Bíceps",
    equipment: "Halter",
    difficulty: "Iniciante",
    description: "Exercício isolado para bíceps",
    videoUrl: "#"
  },
  {
    id: 5,
    name: "Prancha",
    category: "Core",
    muscleGroup: "Abdomen",
    equipment: "Peso Corporal",
    difficulty: "Iniciante",
    description: "Exercício isométrico para core",
    videoUrl: "#"
  }
];

export function AddExerciseModal({ isOpen, onClose, onAddExercise }: AddExerciseModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExercises = mockExercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddExercise = (exercise: Exercise) => {
    onAddExercise(exercise);
    onClose();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante": return "bg-green-100 text-green-800";
      case "Intermediário": return "bg-yellow-100 text-yellow-800";
      case "Avançado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Adicionar Exercício ao Treino
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar exercícios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl border-slate-200"
            />
          </div>

          {/* Exercise List */}
          <div className="max-h-96 overflow-y-auto space-y-3">
            {filteredExercises.map((exercise) => (
              <div key={exercise.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:shadow-sm transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Dumbbell className="w-4 h-4 text-indigo-900" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{exercise.name}</h4>
                      <p className="text-sm text-slate-600">{exercise.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline" className="text-xs">
                      {exercise.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {exercise.muscleGroup}
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  {exercise.videoUrl && (
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <Play className="w-4 h-4 mr-1" />
                      Vídeo
                    </Button>
                  )}
                  <Button 
                    onClick={() => handleAddExercise(exercise)}
                    className="bg-indigo-900 hover:bg-indigo-800 rounded-xl"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-8">
              <Dumbbell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">Nenhum exercício encontrado</p>
              <p className="text-sm text-slate-500">Tente ajustar os termos de busca</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
