
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar,
  Dumbbell,
  Plus,
  MessageCircle,
  Star
} from "lucide-react";

interface StudentProfileProps {
  student: any;
  onBack: () => void;
  onViewChange: (view: string, data?: any) => void;
}

const mockWorkouts = [
  {
    id: 1,
    name: "Treino de Força A",
    assignedDate: "2024-01-15",
    status: "Ativo"
  },
  {
    id: 2,
    name: "Treino Cardio B",
    assignedDate: "2024-01-10",
    status: "Concluído"
  }
];

const mockEvaluations = [
  {
    id: 1,
    workoutName: "Treino de Força A",
    date: "2024-01-20",
    rating: 4,
    comments: "Treino muito bom, senti bastante os músculos trabalhando!"
  },
  {
    id: 2,
    workoutName: "Treino Cardio B",
    date: "2024-01-18",
    rating: 5,
    comments: "Excelente! Me senti muito bem após o treino."
  }
];

export function StudentProfile({ student, onBack, onViewChange }: StudentProfileProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>;
      case "Concluído":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Concluído</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
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
          <h1 className="text-3xl font-bold text-slate-800">Perfil de {student?.name}</h1>
          <p className="text-slate-600 mt-1">Informações detalhadas do aluno</p>
        </div>
        <Button
          onClick={() => onViewChange("trainer-messages")}
          className="bg-gradient-to-r from-indigo-900 to-purple-800 hover:from-indigo-800 hover:to-purple-700 rounded-xl"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Enviar Mensagem
        </Button>
      </div>

      {/* Informações Básicas */}
      <Card className="border-0 shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {student?.avatar || student?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="text-sm text-slate-600">Nome</p>
                  <p className="font-semibold text-slate-800">{student?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="font-semibold text-slate-800">{student?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treinos Atribuídos */}
      <Card className="border-0 shadow-lg mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-slate-800">Treinos Atribuídos</CardTitle>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => onViewChange("create-workout", student)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Atribuir Novo Treino
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockWorkouts.map((workout) => (
              <div key={workout.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-indigo-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{workout.name}</h3>
                    <p className="text-sm text-slate-600">
                      Atribuído em {new Date(workout.assignedDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(workout.status)}
                  <Button variant="ghost" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Avaliações */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Histórico de Avaliações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvaluations.map((evaluation) => (
              <div key={evaluation.id} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-800">{evaluation.workoutName}</h3>
                    <p className="text-sm text-slate-600">
                      {new Date(evaluation.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(evaluation.rating)}
                  </div>
                </div>
                <p className="text-slate-700 text-sm">{evaluation.comments}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
