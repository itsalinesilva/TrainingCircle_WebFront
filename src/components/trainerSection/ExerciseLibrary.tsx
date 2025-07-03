import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Filter,
  Dumbbell,
  Heart,
  Zap,
  Target,
  Play,
  Edit,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ExerciseModal } from "./ExerciseModal";

interface ExerciseLibraryProps {
  onBack: () => void;
}

const mockExercises = [
  {
    id: 1,
    name: "Supino Reto",
    category: "Peito",
    muscleGroup: "Peitoral",
    equipment: "Barra",
    difficulty: "Intermediário",
    description: "Exercício básico para desenvolvimento do peitoral, executado deitado no banco com barra",
    videoUrl: "#"
  },
  {
    id: 2,
    name: "Agachamento Livre",
    category: "Pernas",
    muscleGroup: "Quadríceps",
    equipment: "Barra",
    difficulty: "Avançado",
    description: "Exercício fundamental para membros inferiores, trabalha quadríceps, glúteos e core",
    videoUrl: "#"
  },
  {
    id: 3,
    name: "Flexão de Braço",
    category: "Peito",
    muscleGroup: "Peitoral",
    equipment: "Peso Corporal",
    difficulty: "Iniciante",
    description: "Exercício básico usando peso corporal, fortalece peitoral, ombros e tríceps",
    videoUrl: "#"
  },
  {
    id: 4,
    name: "Burpee",
    category: "Cardio",
    muscleGroup: "Corpo Todo",
    equipment: "Peso Corporal",
    difficulty: "Avançado",
    description: "Exercício funcional completo que combina força e cardio",
    videoUrl: "#"
  },
  {
    id: 5,
    name: "Rosca Direta",
    category: "Braços",
    muscleGroup: "Bíceps",
    equipment: "Halter",
    difficulty: "Iniciante",
    description: "Exercício isolado para bíceps, fundamental para desenvolvimento dos braços",
    videoUrl: "#"
  },
  {
    id: 6,
    name: "Prancha",
    category: "Core",
    muscleGroup: "Abdomen",
    equipment: "Peso Corporal",
    difficulty: "Iniciante",
    description: "Exercício isométrico para fortalecimento do core e estabilização",
    videoUrl: "#"
  },
  {
    id: 7,
    name: "Remada Curvada",
    category: "Costas",
    muscleGroup: "Latíssimo",
    equipment: "Barra",
    difficulty: "Intermediário",
    description: "Exercício para desenvolvimento das costas e melhora da postura",
    videoUrl: "#"
  },
  {
    id: 8,
    name: "Desenvolvimento Militar",
    category: "Ombros",
    muscleGroup: "Deltoides",
    equipment: "Barra",
    difficulty: "Intermediário",
    description: "Exercício para desenvolvimento dos ombros e estabilização do core",
    videoUrl: "#"
  }
];

const categories = ["Todos", "Peito", "Pernas", "Braços", "Core", "Cardio", "Costas", "Ombros"];
const difficulties = ["Todos", "Iniciante", "Intermediário", "Avançado"];

export function ExerciseLibrary({ onBack }: ExerciseLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todos");
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const { toast } = useToast();

  const filteredExercises = mockExercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || exercise.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "Todos" || exercise.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Peito": return <Dumbbell className="w-4 h-4" />;
      case "Pernas": return <Target className="w-4 h-4" />;
      case "Braços": return <Zap className="w-4 h-4" />;
      case "Core": return <Target className="w-4 h-4" />;
      case "Cardio": return <Heart className="w-4 h-4" />;
      case "Costas": return <Dumbbell className="w-4 h-4" />;
      case "Ombros": return <Zap className="w-4 h-4" />;
      default: return <Dumbbell className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante": return "bg-green-100 text-green-800";
      case "Intermediário": return "bg-yellow-100 text-yellow-800";
      case "Avançado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddToWorkout = (exercise: any) => {
    toast({
      title: "Exercício adicionado",
      description: `${exercise.name} foi adicionado ao treino atual.`,
    });
  };

  const handleEditExercise = (exercise: any) => {
    setEditingExercise(exercise);
    setIsExerciseModalOpen(true);
  };

  const handleDeleteExercise = (exercise: any) => {
    toast({
      title: "Exercício removido",
      description: `${exercise.name} foi removido da biblioteca.`,
      variant: "destructive",
    });
  };

  const handleSaveExercise = (exerciseData: any) => {
    console.log("Salvando exercício:", exerciseData);
    setEditingExercise(null);
  };

  const handleCloseModal = () => {
    setIsExerciseModalOpen(false);
    setEditingExercise(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
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
          <h1 className="text-3xl font-bold text-slate-800">Biblioteca de Exercícios</h1>
          <p className="text-slate-600 mt-1">Gerencie sua coleção de exercícios com vídeos demonstrativos</p>
        </div>
        <Button 
          onClick={() => setIsExerciseModalOpen(true)}
          className="bg-gradient-to-r from-indigo-900 to-purple-800 hover:from-indigo-800 hover:to-purple-700 rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Exercício
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-lg mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar exercícios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl border-slate-200"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Categoria</label>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap rounded-xl"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Dificuldade</label>
              <div className="flex gap-2 overflow-x-auto">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className="whitespace-nowrap rounded-xl"
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-slate-600">
          Encontrados <span className="font-semibold text-slate-800">{filteredExercises.length}</span> exercícios
          {searchTerm && ` para "${searchTerm}"`}
          {selectedCategory !== "Todos" && ` na categoria "${selectedCategory}"`}
          {selectedDifficulty !== "Todos" && ` com dificuldade "${selectedDifficulty}"`}
        </p>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    {getCategoryIcon(exercise.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg leading-tight">{exercise.name}</CardTitle>
                    <p className="text-sm text-slate-600">{exercise.category} • {exercise.muscleGroup}</p>
                  </div>
                </div>
                <Badge className={`${getDifficultyColor(exercise.difficulty)} shrink-0`}>
                  {exercise.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600 line-clamp-3">{exercise.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Equipamento:</span>
                  <span className="font-medium text-slate-800">{exercise.equipment}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                {exercise.videoUrl && (
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl group-hover:border-indigo-300">
                    <Play className="w-4 h-4 mr-1" />
                    Vídeo
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl group-hover:border-indigo-300"
                  onClick={() => handleEditExercise(exercise)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  onClick={() => handleDeleteExercise(exercise)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <Button 
                onClick={() => handleAddToWorkout(exercise)}
                className="w-full bg-indigo-900 hover:bg-indigo-800 rounded-xl"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar ao Treino
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-16">
          <Dumbbell className="w-20 h-20 text-slate-300 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-slate-800 mb-3">Nenhum exercício encontrado</h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            Tente ajustar os filtros ou termos de busca, ou adicione novos exercícios à sua biblioteca
          </p>
          <Button 
            onClick={() => setIsExerciseModalOpen(true)}
            className="bg-gradient-to-r from-indigo-900 to-purple-800 hover:from-indigo-800 hover:to-purple-700 rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Novo Exercício
          </Button>
        </div>
      )}

      <ExerciseModal
        isOpen={isExerciseModalOpen}
        onClose={handleCloseModal}
        exercise={editingExercise}
        onSave={handleSaveExercise}
      />
    </div>
  );
}
