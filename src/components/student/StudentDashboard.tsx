
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dumbbell, 
  Play, 
  MessageCircle, 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Droplets, 
  Utensils,
  ChevronRight,
  Flame
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface StudentDashboardProps {
  user: any;
  onViewChange: (view: string) => void;
}

export function StudentDashboard({ user, onViewChange }: StudentDashboardProps) {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Olá, {user.name}!</h1>
        <p className="text-slate-600">Pronto para mais um treino?</p>
      </div>

      {/* Treino do Dia */}
      <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-indigo-900 to-purple-800 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl mb-2">Treino do Dia</CardTitle>
              <CardDescription className="text-indigo-100">
                Treino de Força A
              </CardDescription>
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

      {/* Upcoming Schedule */}
      <Card className="mb-8 border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Agenda da Semana</CardTitle>
            <Button variant="ghost" size="sm" className="text-indigo-600">Ver Tudo</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { day: 'Segunda', workout: 'Treino de Força A', time: '19:00', duration: '45 min' },
            { day: 'Quarta', workout: 'Treino Cardio', time: '19:00', duration: '30 min' },
            { day: 'Sexta', workout: 'Treino de Força B', time: '19:00', duration: '45 min' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-indigo-900" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">{item.day} - {item.workout}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time} • {item.duration}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Atalhos Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-md"
          onClick={() => onViewChange("my-workouts")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <Dumbbell className="w-6 h-6 text-indigo-900" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Meus Treinos</h3>
            <p className="text-sm text-slate-600">Ver todos os treinos</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-md"
          onClick={() => onViewChange("evaluate-workout")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Avaliar Treino</h3>
            <p className="text-sm text-slate-600">Feedback do treino</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-md"
          onClick={() => onViewChange("messages")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Mensagens</h3>
            <p className="text-sm text-slate-600">Chat com personal</p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-md"
          onClick={() => onViewChange("progress")}
        >
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Meu Progresso</h3>
            <p className="text-sm text-slate-600">Acompanhar evolução</p>
          </CardContent>
        </Card>
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Water Intake */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              Hidratação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-blue-600 mb-1">2.1L</div>
              <p className="text-sm text-slate-600">de 3L diários</p>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>0L</span>
              <span>3L</span>
            </div>
            <Progress value={70} className="h-2" />
            <div className="flex justify-center mt-4 gap-2">
              {[0.5, 1, 1.5, 2, 2.5, 3].map((liter, i) => (
                <button 
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                    ${liter <= 2.1 ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-400'}`}
                >
                  {liter}L
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meal Plan */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils className="w-5 h-5 text-amber-500" />
              Plano Alimentar de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { meal: 'Café da Manhã', calories: 450, name: 'Omelete com pão integral' },
                { meal: 'Almoço', calories: 650, name: 'Arroz integral, frango e salada' },
                { meal: 'Lanche', calories: 300, name: 'Iogurte com granola' },
                { meal: 'Jantar', calories: 500, name: 'Peixe grelhado com legumes' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">{item.meal}</p>
                    <p className="text-sm text-slate-600">{item.name}</p>
                  </div>
                  <div className="flex items-center text-sm text-amber-600">
                    <Flame className="w-4 h-4 mr-1" />
                    {item.calories} cal
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Progresso Rápido */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Progresso Semanal</CardTitle>
            <CardDescription>Seus números desta semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-900 mb-1">4/5</div>
                <p className="text-xs text-slate-600">Treinos</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700 mb-1">2h 30m</div>
                <p className="text-xs text-slate-600">Tempo</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-700 mb-1">85%</div>
                <p className="text-xs text-slate-600">Conclusão</p>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Atividades Recentes</CardTitle>
            <CardDescription>Suas últimas conquistas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  activity: 'Treino de Força A concluído', 
                  time: 'Hoje, 19:30',
                  icon: <CheckCircle className="w-5 h-5 text-green-500" />
                },
                { 
                  activity: 'Novo recorde: Supino Reto', 
                  time: 'Ontem',
                  icon: <TrendingUp className="w-5 h-5 text-blue-500" />
                },
                { 
                  activity: 'Meta semanal atingida', 
                  time: '3 dias atrás',
                  icon: <Dumbbell className="w-5 h-5 text-purple-500" />
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{item.activity}</p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
