import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, MessageSquare, Activity, ArrowRight, Star, ChevronRight, CheckCircle, MessageSquare as MessageSquareIcon } from "lucide-react";

export const TrainerDashboard = () => {
  const upcomingSessions = [
    { id: 1, name: "João Silva", time: "10:00 - 11:00", type: "Avaliação Física" },
    { id: 2, name: "Ana Oliveira", time: "11:30 - 12:30", type: "Treino Personalizado" },
    { id: 3, name: "Carlos Santos", time: "15:00 - 16:00", type: "Acompanhamento" },
  ];

  const recentActivities = [
    { id: 1, student: "João Silva", action: "Concluiu o treino de pernas", time: "2h atrás" },
    { id: 2, student: "Ana Oliveira", action: "Enviou mensagem", time: "Ontem" },
    { id: 3, student: "Carlos Santos", action: "Atualizou medidas corporais", time: "2 dias atrás" },
  ];

  // Dados de exemplo para avaliações recentes
  const recentEvaluations = [
    {
      id: 1,
      student: "João Silva",
      workout: "Treino de Força A",
      rating: 4,
      comment: "Treino muito bom, senti que poderia ter mais peso no supino.",
      date: "Há 2 horas",
      responded: false
    },
    {
      id: 2,
      student: "Maria Santos",
      workout: "Treino Cardio",
      rating: 5,
      comment: "Excelente treino, me senti muito bem!",
      date: "Ontem",
      responded: true
    },
    {
      id: 3,
      student: "Carlos Oliveira",
      workout: "Treino de Mobilidade",
      rating: 3,
      comment: "Treino desafiador, mas consegui completar.",
      date: "2 dias atrás",
      responded: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Olá, Maria!</h1>
          <p className="text-gray-500">Bem-vinda ao seu painel de personal trainer</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Mensagens
          </Button>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Agendar Aula
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alunos Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+2 em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aulas Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Próxima aula em 1h30</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Não lidas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Adesão</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+5% em relação ao mês passado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Próximas Aulas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center p-4 border rounded-lg">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{session.name}</p>
                    <p className="text-sm text-muted-foreground">{session.time} • {session.type}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    Ver Detalhes
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.student}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-4">
                Ver todas as atividades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Avaliações Recentes */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Avaliações Recentes</CardTitle>
              <Button variant="ghost" size="sm" className="text-indigo-600">Ver Todas</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  id: 1, 
                  student: "João Silva", 
                  date: "28/06/2024", 
                  type: "Avaliação Física",
                  rating: 4,
                  comment: "Treino muito bom, senti que poderia ter mais peso no supino.",
                  avatar: "JS"
                },
                { 
                  id: 2, 
                  student: "Ana Oliveira", 
                  date: "27/06/2024", 
                  type: "Avaliação de Desempenho",
                  rating: 5,
                  comment: "Excelente treino, me senti muito bem!",
                  avatar: "AO"
                },
                { 
                  id: 3, 
                  student: "Carlos Santos", 
                  date: "25/06/2024", 
                  type: "Avaliação Física",
                  rating: 3,
                  comment: "Treino desafiador, mas consegui completar.",
                  avatar: "CS"
                },
              ].map((evaluation) => (
                <div key={evaluation.id} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-indigo-900">{evaluation.avatar}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-slate-800">{evaluation.student}</p>
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                            {evaluation.type}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{evaluation.comment}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`w-3.5 h-3.5 ${star <= evaluation.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">{evaluation.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Estatísticas de Avaliações */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Resumo de Avaliações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-indigo-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Média Geral</span>
                <span className="text-2xl font-bold text-indigo-900">4.2</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400 fill-current' : star === 5 ? 'text-yellow-400' : 'text-slate-300'}`}
                  />
                ))}
                <span className="text-xs text-slate-500 ml-1">(42 avaliações)</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Excelente</span>
                <span className="font-medium">28</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-full bg-green-500" style={{ width: '65%' }}></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Bom</span>
                <span className="font-medium">10</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-full bg-blue-500" style={{ width: '25%' }}></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Regular</span>
                <span className="font-medium">3</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-full bg-yellow-500" style={{ width: '7%' }}></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Ruim</span>
                <span className="font-medium">1</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-full bg-red-500" style={{ width: '2%' }}></div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              Ver Relatório Completo
              <ArrowRight className="ml-2 h-4 w-4" />
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
            onClick={() => window.location.href = '/trainer/evaluations'}
          >
            Ver todas
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {recentEvaluations.map((evaluation) => (
                <div key={evaluation.id} className="p-4 hover:bg-slate-50 transition-colors">
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
                          className="text-indigo-600"
                          onClick={() => window.location.href = '/trainer/evaluations'}
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
                onClick={() => window.location.href = '/trainer/evaluations'}
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
};

export default TrainerDashboard;
