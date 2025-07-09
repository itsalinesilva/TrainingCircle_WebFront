
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Dumbbell, 
  MessageCircle, 
  Library,
  TrendingUp,
  Star,
  Calendar,
  ChevronRight,
  Plus,
  Video,
  Clock,
  FileText,
  BarChart2,
  ClipboardList,
  MessageSquare,
  CheckCircle2,
  CalendarDays,
  NotebookText,
  MessageSquare as MessageSquareIcon,
  CheckCircle,
  Clock as ClockIcon,
  Play,
  TrendingUp as TrendingUpIcon
} from "lucide-react";
import { RecentEvaluations } from "./RecentEvaluations";

interface TrainerDashboardProps {
  user: any;
  onViewChange: (view: string) => void;
}

export function TrainerDashboard({ user, onViewChange }: TrainerDashboardProps) {
  const quickStats = [
    { label: "Total de Alunos", value: "15", icon: Users, color: "bg-blue-50 text-blue-900" },
    { label: "Treinos Criados", value: "23", icon: Dumbbell, color: "bg-purple-50 text-purple-900" },
    { label: "Mensagens", value: "5", icon: MessageCircle, color: "bg-orange-50 text-orange-900" }
  ];

  const recentEvaluations = [
    {
      student: "João Silva",
      workout: "Treino de Força A",
      rating: 4,
      date: "Há 2 horas",
      comment: "Treino muito bom, senti que poderia ter mais peso no supino.",
      responded: false
    },
    {
      student: "Maria Santos",
      workout: "Treino Cardio",
      rating: 5,
      date: "Ontem",
      comment: "Excelente treino, me senti muito bem!",
      responded: false
    }
  ];

  // Sample data for the dashboard
  const upcomingSessions = [
    { id: 1, student: 'João Silva', time: '19:00', duration: '45 min', type: 'Treino de Força' },
    { id: 2, student: 'Maria Santos', time: '20:00', duration: '30 min', type: 'Avaliação Física' },
    { id: 3, student: 'Carlos Oliveira', time: 'Amanhã, 18:30', duration: '1 hora', type: 'Treino Personalizado' },
  ];

  const recentMessages = [
    { id: 1, student: 'Ana Beatriz', time: '2 min atrás', preview: 'Professor, posso remarcar a aula de amanhã?', unread: true },
    { id: 2, student: 'Pedro Henrique', time: '1 hora atrás', preview: 'Obrigado pelo treino de hoje!', unread: false },
    { id: 3, student: 'Juliana Costa', time: 'Ontem', preview: 'Podemos ajustar o treino de pernas?', unread: false },
  ];

  const trainingPlans = [
    { id: 1, name: 'Iniciante - Força', students: 8, lastUpdated: '2 dias atrás' },
    { id: 2, name: 'Intermediário - Hipertrofia', students: 12, lastUpdated: '1 semana atrás' },
    { id: 3, name: 'Avançado - Potência', students: 5, lastUpdated: '3 dias atrás' },
  ];

  // Dados das métricas do dia
  const todayMetrics = {
    completedWorkouts: 8,
    upcomingWorkouts: 5,
    activeStudents: 12,
    totalScheduled: 15,
    completionRate: 85,
    trendUp: true
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Olá, {user.name}! 👋
        </h1>
        <p className="text-slate-600">
          Bem-vindo ao seu painel de controle. Gerencie seus alunos e treinos.
        </p>
        <div className="mt-2 flex items-center text-sm text-slate-500">
          <CalendarDays className="w-4 h-4 mr-1.5" />
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* Card de Métricas do Dia */}
      <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-indigo-900 to-purple-800 text-white w-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Visão Geral do Dia</CardTitle>
              <CardDescription className="text-indigo-100 mt-1">
                Resumo das suas atividades de hoje
              </CardDescription>
            </div>
            <BarChart2 className="w-7 h-7 text-indigo-200" />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 w-full">
            {/* Próximos Treinos */}
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-indigo-100">Próximos Treinos</span>
                <Clock className="w-5 h-5 text-amber-300" />
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">{todayMetrics.upcomingWorkouts}</span>
                <span className="text-xs flex items-center text-green-300">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  8%
                </span>
              </div>
            </div>

            {/* Treinos Finalizados */}
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-indigo-100">Treinos Finalizados</span>
                <CheckCircle2 className="w-5 h-5 text-green-300" />
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold">{todayMetrics.completedWorkouts}</span>
                <span className="text-xs flex items-center text-green-300">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  12%
                </span>
              </div>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-indigo-100">Taxa de conclusão do dia</span>
              <span className="font-medium">{todayMetrics.completionRate}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-green-400 to-cyan-400 h-2.5 rounded-full" 
                style={{ width: `${todayMetrics.completionRate}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Upcoming Sessions */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-indigo-900" />
                Próximas Sessões
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-indigo-600">Ver Calendário</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-indigo-900" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{session.student}</p>
                      <p className="text-sm text-slate-600">{session.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-800">{session.time}</p>
                    <p className="text-sm text-slate-500">{session.duration}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => onViewChange('calendar')}>
              Ver Agenda Completa
            </Button>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-900" />
                Mensagens Recentes
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-indigo-600">Ver Todas</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-3 rounded-xl cursor-pointer hover:bg-slate-50 ${message.unread ? 'bg-blue-50' : ''}`}
                  onClick={() => onViewChange(`messages-${message.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${message.unread ? 'text-blue-800' : 'text-slate-800'} truncate`}>
                          {message.student}
                        </p>
                        <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">{message.time}</span>
                      </div>
                      <p className="text-sm text-slate-600 truncate">{message.preview}</p>
                    </div>
                    {message.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 flex-shrink-0"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => onViewChange('messages')}>
              Ver Todas as Mensagens
            </Button>
          </CardContent>
        </Card>

        {/* Training Plans */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <NotebookText className="w-5 h-5 text-indigo-900" />
                Planos de Treino
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-xl"
                onClick={() => onViewChange('training-plans')}
              >
                Ver Todos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingPlans.map((plan) => (
                <div key={plan.id} className="p-3 bg-slate-50 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-slate-800">{plan.name}</h3>
                      <p className="text-xs text-slate-500">{plan.students} alunos</p>
                    </div>
                    <span className="text-xs text-slate-500">Atualizado {plan.lastUpdated}</span>
                  </div>
                  <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full" 
                      style={{ width: `${Math.min(100, (plan.students / 15) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => onViewChange('create-plan')}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Plano
            </Button>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-900" />
              Métricas de Desempenho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Taxa de Retenção</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2 bg-slate-200" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Satisfação dos Alunos</span>
                  <span className="font-medium">4.8/5</span>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : star === 5 ? 'text-yellow-400' : 'text-slate-300'}`}
                    />
                  ))}
                  <span className="text-xs text-slate-500 ml-2">(42 avaliações)</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Meta Mensal</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                        Em andamento
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-indigo-600">
                        75%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                    <div 
                      style={{ width: '75%' }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => onViewChange('analytics')}>
              Ver Análises Detalhadas
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Avaliações Recentes */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Avaliações Recentes</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-indigo-600 hover:bg-indigo-50"
            onClick={() => onViewChange('evaluations')}
          >
            Ver todas
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {recentEvaluations.map((evaluation, index) => (
                <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-900 font-medium">
                          {evaluation.student.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-slate-900">{evaluation.student}</p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {evaluation.workout}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-600">{evaluation.comment}</p>
                        <div className="mt-2 flex items-center text-sm text-slate-500">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= evaluation.rating ? 'text-yellow-400' : 'text-slate-300'
                                }`}
                                fill={star <= evaluation.rating ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                          <span className="mx-2">·</span>
                          <span>{evaluation.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {evaluation.responded ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Respondida
                        </span>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewChange('evaluations')}
                        >
                          <MessageSquareIcon className="mr-1 h-3.5 w-3.5" />
                          Responder
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-100 px-6 py-4 bg-slate-50 rounded-b-lg">
              <Button 
                variant="ghost" 
                className="text-indigo-600 hover:bg-indigo-50 w-full justify-center"
                onClick={() => onViewChange('evaluations')}
              >
                Ver todas as avaliações
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
