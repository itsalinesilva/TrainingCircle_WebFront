import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare,
  Video,
  Calendar,
  ArrowUp,
  ArrowDown,
  Dumbbell,
  Clock,
  TrendingUp,
  User,
  Bell
} from "lucide-react";

export const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-100">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">Olá, João!</h1>
          <p className="text-purple-600 font-medium">Bem-vindo de volta ao seu painel</p>
        </div>
        <div className="flex items-center space-x-3 bg-white px-4 py-3 rounded-full shadow-sm border border-purple-100">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              7
            </div>
            <div className="absolute -top-1 -right-1">
              <div className="h-5 w-5 rounded-full bg-green-400 border-2 border-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs text-purple-500">Dias consecutivos</p>
            <p className="text-sm font-semibold text-purple-800">+100 XP ganhos</p>
          </div>
          <div className="ml-2 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {/* Card 1: Treino do Dia */}
        <Card className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-indigo-800/50">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white">Treino do Dia</p>
                  <p className="text-sm text-indigo-200 font-normal">Treino de Força A</p>
                </div>
              </div>
              <div className="relative h-8 w-8 rounded-full bg-indigo-800/50 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
                <span className="absolute text-xs font-medium text-white">{new Date().getDate()}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-indigo-200">Duração</p>
                <p className="font-medium">45-60 minutos</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-sm text-indigo-200">Exercícios</p>
                <p className="font-medium">8 exercícios</p>
              </div>
            </div>
            <Button className="w-full bg-white text-indigo-900 hover:bg-indigo-100 font-medium">
              Iniciar Treino
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

      </div>

      <div className="w-full pb-6">
        {/* Card 2: Personal Responsável */}
        <Card className="w-full bg-gradient-to-r from-indigo-50 to-indigo-50 border border-indigo-100">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-indigo-700" />
                <span className="text-indigo-800">Seu Personal</span>
              </CardTitle>
              <div className="relative">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-700 hover:bg-indigo-100 relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-[10px] font-medium flex items-center justify-center">3</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white shadow-sm">
                  <User className="h-8 w-8 text-indigo-700" />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="text-lg font-semibold text-indigo-900">Carlos Silva</p>
                <p className="text-sm text-indigo-600">Personal Trainer</p>
                <p className="text-xs text-indigo-400 mt-1">Online agora</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800">
                <MessageSquare className="h-4 w-4 mr-2" />
                Mensagem
              </Button>
              <Button variant="outline" className="flex-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800">
                <Video className="h-4 w-4 mr-2" />
                Chamada
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 3: Treinos da Semana */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Treinos da Semana
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Programados</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold">5</span>
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-500">+1</span>
                </div>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Concluídos</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold">3</span>
                  <ArrowUp className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-500">+2</span>
                </div>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Agendamento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-indigo-600" />
              Agendamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-indigo-100">
                  <Clock className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Treino de Costas</p>
                  <p className="text-xs text-muted-foreground">Hoje às 19:00</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-muted-foreground">Previsto</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 5: Progresso Geral */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Progresso Geral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Hoje</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Horas de treino</span>
                    <span className="font-medium">1.2h</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Exercícios completos</span>
                    <span className="font-medium">8/12</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Esta Semana</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Horas de treino</span>
                    <span className="font-medium">4.5h</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Treinos completos</span>
                    <span className="font-medium">3/5</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Seu Progresso</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              Gráfico de Progresso
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Próximos Compromissos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Avaliação Física</p>
                  <p className="text-sm text-muted-foreground">Amanhã às 10:00</p>
                </div>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Aula de Natação</p>
                  <p className="text-sm text-muted-foreground">Sexta às 19:00</p>
                </div>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
