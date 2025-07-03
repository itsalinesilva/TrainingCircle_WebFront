
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Dumbbell, 
  Calendar, 
  TrendingUp, 
  MessageCircle, 
  Star,
  ChevronRight,
  Clock,
  Target,
  Video,
  Play
} from "lucide-react";

interface UserDashboardProps {
  user: any;
  onViewChange: (view: string) => void;
}

export function UserDashboard({ user, onViewChange }: UserDashboardProps) {
  const quickStats = [
    { label: "Treinos Esta Semana", value: "4", icon: Dumbbell, color: "bg-blue-50 text-blue-900" },
    { label: "Próximo Treino", value: "Hoje", icon: Calendar, color: "bg-green-50 text-green-900" },
    { label: "Progresso Geral", value: "87%", icon: TrendingUp, color: "bg-purple-50 text-purple-900" },
    { label: "Mensagens", value: "2", icon: MessageCircle, color: "bg-orange-50 text-orange-900" }
  ];

  const quickActions = [
    { title: "Meus Treinos", icon: Dumbbell, id: "my-workouts", description: "Ver treinos prescritos" },
    { title: "Meu Progresso", icon: TrendingUp, id: "progress", description: "Acompanhar evolução" },
    { title: "Avaliar Treino", icon: Star, id: "evaluate-workout", description: "Dar feedback" },
    { title: "Mensagens", icon: MessageCircle, id: "messages", description: "Falar com seu PT" },
    { title: "Evento ao Vivo", icon: Video, id: "live-event", description: "Participar de lives" }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Olá, {user.name}! 👋
        </h1>
        <p className="text-slate-600">
          Bem-vindo de volta! Vamos continuar sua jornada fitness.
        </p>
      </div>

      {/* Treino do Dia */}
      <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-indigo-900 to-purple-800 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl mb-2">Treino do Dia</CardTitle>
              <p className="text-indigo-100">Treino de Força A</p>
            </div>
            <Calendar className="w-8 h-8 text-indigo-200" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-indigo-100 mb-4">8 exercícios • 45-60 minutos</p>
          <Button 
            onClick={() => onViewChange("my-workouts")}
            className="bg-white text-indigo-900 hover:bg-indigo-50 font-medium rounded-xl"
          >
            <Play className="w-4 h-4 mr-2" />
            Iniciar Treino
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Personal Trainer Info */}
      <Card className="border-0 shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-900" />
            Seu Personal Trainer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {user.personalTrainer?.charAt(0) || 'P'}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 text-lg">{user.personalTrainer}</h3>
              <p className="text-slate-600">Personal Trainer Certificado</p>
            </div>
            <Button
              onClick={() => onViewChange("messages")}
              variant="outline"
              className="rounded-xl"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Mensagem
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Card 
              key={action.id} 
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => onViewChange(action.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <action.icon className="w-5 h-5 text-indigo-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{action.title}</h3>
                      <p className="text-sm text-slate-600">{action.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Progresso Semanal */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-900" />
            Progresso Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-900 mb-1">4</div>
              <p className="text-sm text-slate-600">Treinos Completados</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-1">2h 30m</div>
              <p className="text-sm text-slate-600">Tempo Total</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700 mb-1">85%</div>
              <p className="text-sm text-slate-600">Taxa de Conclusão</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
