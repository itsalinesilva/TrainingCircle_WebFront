import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Clock, Calendar, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const StudentWorkouts = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  const workouts = [
    {
      id: 1,
      title: "Treino de Superiores",
      description: "Foco em peito, ombros e tríceps",
      duration: "45 min",
      date: "Hoje",
      completed: true,
      exercises: 8,
    },
    {
      id: 2,
      title: "Treino de Inferiores",
      description: "Pernas e glúteos",
      duration: "50 min",
      date: "Amanhã",
      completed: false,
      exercises: 6,
    },
    {
      id: 3,
      title: "Treino de Costas e Bíceps",
      description: "Dorsais e bíceps",
      duration: "40 min",
      date: "Quinta-feira",
      completed: false,
      exercises: 7,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Meus Treinos</h1>
            <p className="text-gray-500">Acompanhe seus treinos semanais</p>
          </div>
        </div>
        <Button>Ver Calendário</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <Card key={workout.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{workout.title}</CardTitle>
                  <p className="text-sm text-gray-500">{workout.description}</p>
                </div>
                {workout.completed && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  {workout.duration}
                </div>
                <div className="flex items-center text-gray-500">
                  <Dumbbell className="mr-1 h-4 w-4" />
                  {workout.exercises} exercícios
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-4 w-4" />
                  {workout.date}
                </div>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Treinos Anteriores</h2>
        <div className="space-y-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div>
                <h3 className="font-medium">Treino de Superiores - Semana {item}</h3>
                <p className="text-sm text-gray-500">Concluído há {item} semana{item > 1 ? 's' : ''}</p>
              </div>
              <Button variant="ghost" size="sm">
                Ver Detalhes
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentWorkouts;
