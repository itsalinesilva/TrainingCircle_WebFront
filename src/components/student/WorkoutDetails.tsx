
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Play, RotateCcw, CheckCircle, Dumbbell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkoutDetailsProps {
  workout: any;
  onBack: () => void;
}

const mockExercises = [
  {
    id: 1,
    name: "Agachamento",
    sets: 3,
    reps: 12,
    weight: "20kg",
    description: "Agachamento livre com barra",
    videoUrl: "#",
    restTime: "60s"
  },
  {
    id: 2,
    name: "Supino Reto",
    sets: 3,
    reps: 10,
    weight: "40kg",
    description: "Supino reto com barra",
    videoUrl: "#",
    restTime: "90s"
  },
  {
    id: 3,
    name: "Remada Curvada",
    sets: 3,
    reps: 12,
    weight: "30kg",
    description: "Remada curvada com barra",
    videoUrl: "#",
    restTime: "60s"
  },
  {
    id: 4,
    name: "Desenvolvimento",
    sets: 3,
    reps: 10,
    weight: "25kg",
    description: "Desenvolvimento com halteres",
    videoUrl: "#",
    restTime: "60s"
  },
  {
    id: 5,
    name: "Rosca Direta",
    sets: 3,
    reps: 12,
    weight: "15kg",
    description: "Rosca direta com barra",
    videoUrl: "#",
    restTime: "45s"
  }
];

export function WorkoutDetails({ workout, onBack }: WorkoutDetailsProps) {
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [exerciseData, setExerciseData] = useState<{[key: number]: {weight: string, reps: string}}>({});
  const { toast } = useToast();

  const handleExerciseComplete = (exerciseId: number, completed: boolean) => {
    if (completed) {
      setCompletedExercises([...completedExercises, exerciseId]);
    } else {
      setCompletedExercises(completedExercises.filter(id => id !== exerciseId));
    }
  };

  const handleExerciseDataChange = (exerciseId: number, field: string, value: string) => {
    setExerciseData(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [field]: value
      }
    }));
  };

  const handleFinishWorkout = () => {
    if (completedExercises.length === mockExercises.length) {
      toast({
        title: "Treino finalizado!",
        description: "Parabéns! Você completou todos os exercícios.",
      });
    } else {
      toast({
        title: "Treino incompleto",
        description: `Você completou ${completedExercises.length} de ${mockExercises.length} exercícios.`,
        variant: "destructive",
      });
    }
  };

  const handleResetWorkout = () => {
    setCompletedExercises([]);
    setExerciseData({});
    toast({
      title: "Treino resetado",
      description: "Todos os exercícios foram desmarcados.",
    });
  };

  const completionPercentage = (completedExercises.length / mockExercises.length) * 100;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-800">{workout?.name || "Treino de Força A"}</h1>
          <p className="text-slate-600 mt-1">{workout?.description || "Foco em membros superiores"}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="mb-6 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Progresso do Treino</h3>
              <p className="text-sm text-slate-600">
                {completedExercises.length} de {mockExercises.length} exercícios completados
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-900">{Math.round(completionPercentage)}%</div>
            </div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-900 to-purple-800 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise List */}
      <div className="space-y-4 mb-6">
        {mockExercises.map((exercise, index) => (
          <Card key={exercise.id} className="border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-900">
                    {index + 1}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    <p className="text-sm text-slate-600">{exercise.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-indigo-900 border-indigo-200 hover:bg-indigo-50"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Vídeo
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Prescrição</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Séries:</span>
                      <span className="font-medium">{exercise.sets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Repetições:</span>
                      <span className="font-medium">{exercise.reps}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Carga:</span>
                      <span className="font-medium">{exercise.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Descanso:</span>
                      <span className="font-medium">{exercise.restTime}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Executado</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-slate-600">Carga utilizada</label>
                      <Input
                        placeholder="Ex: 22kg"
                        value={exerciseData[exercise.id]?.weight || ""}
                        onChange={(e) => handleExerciseDataChange(exercise.id, "weight", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-600">Repetições realizadas</label>
                      <Input
                        placeholder="Ex: 12, 10, 8"
                        value={exerciseData[exercise.id]?.reps || ""}
                        onChange={(e) => handleExerciseDataChange(exercise.id, "reps", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id={`exercise-${exercise.id}`}
                        checked={completedExercises.includes(exercise.id)}
                        onCheckedChange={(checked) => handleExerciseComplete(exercise.id, checked as boolean)}
                      />
                      <label htmlFor={`exercise-${exercise.id}`} className="text-sm font-medium text-slate-700">
                        Marcar como concluído
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={handleResetWorkout}
          variant="outline"
          className="px-6 py-3 rounded-xl"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Resetar Treino
        </Button>
        <Button
          onClick={handleFinishWorkout}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-900 to-purple-800 hover:from-indigo-800 hover:to-purple-700"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Finalizar Treino
        </Button>
      </div>
    </div>
  );
}
