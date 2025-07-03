
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Clock, Calendar, ChevronRight, ArrowLeft } from "lucide-react";

interface UserMyWorkoutsProps {
  onViewChange: (view: string, workout?: any) => void;
  onBack: () => void;
}

const mockWorkouts = [
  {
    id: 1,
    name: "Treino de Força A",
    description: "Foco em membros superiores",
    exercises: 8,
    duration: "45-60 min",
    status: "Ativo",
    date: "2024-01-15",
    lastCompleted: "Ontem"
  },
  {
    id: 2,
    name: "Treino de Força B",
    description: "Foco em membros inferiores",
    exercises: 6,
    duration: "40-50 min",
    status: "Ativo",
    date: "2024-01-15",
    lastCompleted: "Há 2 dias"
  },
  {
    id: 3,
    name: "Treino Cardio",
    description: "Exercícios cardiovasculares",
    exercises: 5,
    duration: "30-40 min",
    status: "Ativo",
    date: "2024-01-15",
    lastCompleted: "Há 3 dias"
  },
  {
    id: 4,
    name: "Treino Funcional",
    description: "Movimentos funcionais completos",
    exercises: 7,
    duration: "35-45 min",
    status: "Concluído",
    date: "2024-01-10",
    lastCompleted: "Há 1 semana"
  }
];

export function UserMyWorkouts({ onViewChange, onBack }: UserMyWorkoutsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>;
      case "Concluído":
        return <Badge variant="secondary">Concluído</Badge>;
      case "Pendente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold text-slate-800">Meus Treinos</h1>
          <p className="text-slate-600 mt-1">Acompanhe todos os seus treinos prescritos</p>
        </div>
      </div>

      <div className="space-y-4">
        {mockWorkouts.map((workout) => (
          <Card key={workout.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Dumbbell className="w-5 h-5 text-indigo-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">{workout.name}</h3>
                      <p className="text-slate-600 text-sm">{workout.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Dumbbell className="w-4 h-4" />
                      <span>{workout.exercises} exercícios</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Última vez: {workout.lastCompleted}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusBadge(workout.status)}
                      <span className="text-sm text-slate-500">
                        Atribuído em {new Date(workout.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => onViewChange("workout-details", workout)}
                  variant="ghost"
                  size="sm"
                  className="ml-4 text-indigo-900 hover:text-indigo-700 hover:bg-indigo-50"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
