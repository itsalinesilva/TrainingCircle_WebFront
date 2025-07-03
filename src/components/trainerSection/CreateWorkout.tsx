
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Save, Trash2, Dumbbell, Users, Play, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddExerciseModal } from "./AddExerciseModal";
import { AssignWorkoutModal } from "./AssignWorkoutModal";

interface CreateWorkoutProps {
  onBack: () => void;
  student: any; // Consider replacing 'any' with a more specific type if available
}

interface WorkoutExercise {
  id: number;
  name: string;
  sets: string;
  reps: string;
  weight: string;
  rest: string;
  notes: string;
  category: string;
  muscleGroup: string;
  videoUrl?: string;
}

export function CreateWorkout({ onBack }: CreateWorkoutProps) {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  const addExerciseFromLibrary = (libraryExercise: any) => {
    const newExercise: WorkoutExercise = {
      id: Date.now(),
      name: libraryExercise.name,
      sets: "",
      reps: "",
      weight: "",
      rest: "",
      notes: "",
      category: libraryExercise.category,
      muscleGroup: libraryExercise.muscleGroup,
      videoUrl: libraryExercise.videoUrl
    };
    setExercises([...exercises, newExercise]);
    toast({
      title: "Exercício adicionado!",
      description: `${libraryExercise.name} foi adicionado ao treino.`,
    });
  };

  const updateExercise = (id: number, field: keyof WorkoutExercise, value: string) => {
    setExercises(exercises.map(exercise => 
      exercise.id === id ? { ...exercise, [field]: value } : exercise
    ));
  };

  const removeExercise = (id: number) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  const handleSaveWorkout = () => {
    if (!workoutName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insira um nome para o treino.",
        variant: "destructive",
      });
      return;
    }

    if (exercises.length === 0) {
      toast({
        title: "Exercícios necessários",
        description: "Adicione pelo menos um exercício ao treino.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isEditMode ? "Treino atualizado!" : "Treino criado!",
      description: isEditMode ? "O treino foi atualizado com sucesso." : "O treino foi criado com sucesso.",
    });
  };

  const handleAssignWorkout = () => {
    if (!workoutName.trim()) {
      toast({
        title: "Salve o treino primeiro",
        description: "Por favor, salve o treino antes de atribuí-lo aos alunos.",
        variant: "destructive",
      });
      return;
    }
    setIsAssignModalOpen(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mr-4 hover:bg-slate-100 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-800">
            {isEditMode ? "Editar Treino" : "Criar Treino"}
          </h1>
          <p className="text-slate-600 mt-1">
            {isEditMode ? "Modifique um treino existente" : "Monte um novo treino para seus alunos"}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleAssignWorkout}
            variant="outline"
            className="rounded-xl border-indigo-200 text-indigo-900 hover:bg-indigo-50"
          >
            <Users className="w-4 h-4 mr-2" />
            Atribuir a Aluno(s)
          </Button>
          <Button
            onClick={handleSaveWorkout}
            className="bg-gradient-to-r from-indigo-900 to-purple-800 hover:from-indigo-800 hover:to-purple-700 rounded-xl"
          >
            <Save className="w-4 h-4 mr-2" />
            {isEditMode ? "Atualizar Treino" : "Salvar Treino"}
          </Button>
        </div>
      </div>

      {/* Workout Info */}
      <Card className="border-0 shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Informações do Treino</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nome do Treino *
            </label>
            <Input
              placeholder="Ex: Treino de Força A, Treino Funcional, etc."
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="rounded-xl border-slate-200 focus:border-indigo-300 focus:ring-indigo-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Descrição (opcional)
            </label>
            <Textarea
              placeholder="Descreva o objetivo e características do treino..."
              value={workoutDescription}
              onChange={(e) => setWorkoutDescription(e.target.value)}
              className="rounded-xl border-slate-200 focus:border-indigo-300 focus:ring-indigo-300"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Exercises */}
      <Card className="border-0 shadow-lg mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-slate-800">
              Exercícios ({exercises.length})
            </CardTitle>
            <Button
              onClick={() => setIsAddExerciseModalOpen(true)}
              className="bg-indigo-900 hover:bg-indigo-800 rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Exercício
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {exercises.length === 0 ? (
            <div className="text-center py-12">
              <Dumbbell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Nenhum exercício adicionado</h3>
              <p className="text-slate-600 mb-4">Comece adicionando exercícios da biblioteca</p>
              <Button
                onClick={() => setIsAddExerciseModalOpen(true)}
                className="bg-indigo-900 hover:bg-indigo-800 rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Exercício
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {exercises.map((exercise, index) => (
                <div key={exercise.id} className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-900 text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-lg">{exercise.name}</h4>
                        <p className="text-sm text-slate-600">{exercise.category} • {exercise.muscleGroup}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {exercise.videoUrl && (
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Play className="w-4 h-4 mr-1" />
                          Vídeo
                        </Button>
                      )}
                      <Button
                        onClick={() => removeExercise(exercise.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Séries *
                      </label>
                      <Input
                        placeholder="Ex: 3"
                        value={exercise.sets}
                        onChange={(e) => updateExercise(exercise.id, 'sets', e.target.value)}
                        className="rounded-xl border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Repetições *
                      </label>
                      <Input
                        placeholder="Ex: 12"
                        value={exercise.reps}
                        onChange={(e) => updateExercise(exercise.id, 'reps', e.target.value)}
                        className="rounded-xl border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Carga
                      </label>
                      <Input
                        placeholder="Ex: 60kg"
                        value={exercise.weight}
                        onChange={(e) => updateExercise(exercise.id, 'weight', e.target.value)}
                        className="rounded-xl border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Descanso
                      </label>
                      <Input
                        placeholder="Ex: 60s"
                        value={exercise.rest}
                        onChange={(e) => updateExercise(exercise.id, 'rest', e.target.value)}
                        className="rounded-xl border-slate-200"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Observações e Instruções
                    </label>
                    <Textarea
                      placeholder="Instruções especiais, dicas de execução, variações..."
                      value={exercise.notes}
                      onChange={(e) => updateExercise(exercise.id, 'notes', e.target.value)}
                      className="rounded-xl border-slate-200"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <AddExerciseModal
        isOpen={isAddExerciseModalOpen}
        onClose={() => setIsAddExerciseModalOpen(false)}
        onAddExercise={addExerciseFromLibrary}
      />

      <AssignWorkoutModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        workoutName={workoutName}
      />
    </div>
  );
}
