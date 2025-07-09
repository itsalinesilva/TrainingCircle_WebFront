
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Send, MessageSquare, Clock, CheckCircle, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Função para obter a cor baseada no nível PSE
const getPseColor = (level: number) => {
  if (level <= 1) return 'bg-blue-200';
  if (level <= 3) return 'bg-blue-400';
  if (level <= 6) return 'bg-green-500';
  if (level <= 8) return 'bg-yellow-400';
  if (level === 9) return 'bg-orange-500';
  return 'bg-red-600';
};

// Função para obter a descrição do nível PSE
const getPseDescription = (level: number) => {
  if (level <= 1) return 'Muito leve';
  if (level <= 3) return 'Leve';
  if (level <= 6) return 'Moderado';
  if (level <= 8) return 'Vigoroso';
  if (level === 9) return 'Difícil';
  return 'Máximo';
};

// Função para obter a cor da faixa de intensidade
const getRangeColor = (level: number) => {
  if (level <= 1) return 'bg-blue-100 text-blue-800';
  if (level <= 3) return 'bg-blue-200 text-blue-900';
  if (level <= 6) return 'bg-green-200 text-green-900';
  if (level <= 8) return 'bg-yellow-100 text-yellow-900';
  if (level === 9) return 'bg-orange-100 text-orange-900';
  return 'bg-red-100 text-red-900';
};

interface RecentEvaluationsProps {
  onBack: () => void;
  user: any; // Consider replacing 'any' with a proper type
  onViewChange: (view: string, data?: any) => void;
}

const evaluations = [
  {
    id: 1,
    student: "João Silva",
    workout: "Treino de Força A",
    date: "2024-01-15",
    rating: 4,
    comment: "Treino muito bom, senti que poderia ter mais peso no supino. O exercício de agachamento estava perfeito, mas o supino ficou um pouco fácil.",
    responded: false,
    response: null
  },
  {
    id: 2,
    student: "Maria Santos",
    workout: "Treino Cardio",
    date: "2024-01-14",
    rating: 5,
    comment: "Excelente treino, me senti muito bem! A intensidade estava perfeita e consegui completar todos os exercícios.",
    responded: false,
    response: null
  },
  {
    id: 3,
    student: "Pedro Oliveira",
    workout: "Treino de Força B",
    date: "2024-01-13",
    rating: 3,
    comment: "Treino desafiador, mas consegui completar. Senti dificuldade no desenvolvimento militar.",
    responded: true,
    response: "Obrigado pelo feedback, Pedro! Vamos ajustar a carga do desenvolvimento militar na próxima sessão. Continue assim!"
  },
  {
    id: 4,
    student: "Ana Costa",
    workout: "Treino Funcional",
    date: "2024-01-12",
    rating: 5,
    comment: "Adorei o treino funcional! Me senti mais ágil e os exercícios foram bem variados.",
    responded: true,
    response: "Que bom que gostou, Ana! O treino funcional é excelente para melhorar a coordenação e agilidade."
  }
];

export function RecentEvaluations({ onBack }: RecentEvaluationsProps) {
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [respondedEvaluations, setRespondedEvaluations] = useState<number[]>([]);
  const { toast } = useToast();

  const handleResponseChange = (evaluationId: number, response: string) => {
    setResponses(prev => ({
      ...prev,
      [evaluationId]: response
    }));
  };

  const handleSendResponse = (evaluationId: number) => {
    const response = responses[evaluationId];
    if (!response || response.trim() === "") {
      toast({
        title: "Resposta necessária",
        description: "Por favor, digite uma resposta antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    setRespondedEvaluations(prev => [...prev, evaluationId]);
    setResponses(prev => ({
      ...prev,
      [evaluationId]: ""
    }));

    toast({
      title: "Resposta enviada!",
      description: "Sua resposta foi enviada com sucesso para o aluno.",
    });
  };

  const getStatusBadge = (evaluation: any) => {
    const isJustResponded = respondedEvaluations.includes(evaluation.id);
    const hasResponse = evaluation.responded || isJustResponded;

    if (hasResponse) {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Respondido
        </Badge>
      );
    }
    
    return (
      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
        <Clock className="w-3 h-3 mr-1" />
        Aguardando resposta
      </Badge>
    );
  };

  // Converter avaliações para usar a escala PSE (1-10)
  const pseEvaluations = evaluations.map(evalItem => ({
    ...evalItem,
    pseLevel: Math.min(10, Math.max(1, evalItem.rating * 2))
  }));

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-4xl mx-auto w-full">
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
          <h1 className="text-3xl font-bold text-slate-800">Avaliações dos Alunos</h1>
          <p className="text-slate-600 mt-1">Visualize e responda às avaliações dos treinos</p>
        </div>
      </div>

      {/* Filter/Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">{evaluations.length}</p>
                <p className="text-sm text-slate-600">Total de avaliações</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-900" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">
                  {evaluations.filter(e => !e.responded && !respondedEvaluations.includes(e.id)).length}
                </p>
                <p className="text-sm text-slate-600">Aguardando resposta</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-900" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">
                  {evaluations.filter(e => e.responded || respondedEvaluations.includes(e.id)).length}
                </p>
                <p className="text-sm text-slate-600">Respondidas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evaluations List */}
      <div className="space-y-6">
        {pseEvaluations.map((evaluation) => {
          const isJustResponded = respondedEvaluations.includes(evaluation.id);
          const hasResponse = evaluation.responded || isJustResponded;
          const pseColor = getPseColor(evaluation.pseLevel);
          const pseDescription = getPseDescription(evaluation.pseLevel);
          
          return (
            <Card key={evaluation.id} className="border-0 shadow-lg overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-semibold text-indigo-900">
                        {evaluation.student.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-slate-900">{evaluation.student}</h3>
                        <span className="text-sm bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                          {evaluation.workout}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        {new Date(evaluation.date).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {hasResponse ? (
                      <Badge className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Respondida
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                        <Clock className="w-3 h-3 mr-1" />
                        Aguardando
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 px-6 pb-6">
                {/* Seção de Nível PSE */}
                <div className="mb-6 bg-slate-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Activity className="w-5 h-5 text-indigo-700 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">Nível de Esforço PSE</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`text-sm px-2 py-0.5 rounded-full ${getRangeColor(evaluation.pseLevel)}`}>
                          {evaluation.pseLevel}/10 • {pseDescription}
                        </span>
                        <div className="text-sm text-slate-500">
                          {evaluation.rating * 2}/10
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Barra de nível PSE */}
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${pseColor}`}
                      style={{ width: `${evaluation.pseLevel * 10}%` }}
                    ></div>
                  </div>
                  
                  {/* Escala de 1 a 10 */}
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                  </div>
                </div>
                
                {/* Comentário do aluno */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Comentário do aluno:</h4>
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <p className="text-slate-800">{evaluation.comment}</p>
                  </div>
                </div>

                {/* Resposta do treinador */}
                {hasResponse ? (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-800 mb-1">Sua resposta</p>
                        <p className="text-slate-700">
                          {isJustResponded ? responses[evaluation.id] : evaluation.response}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-slate-700">Sua resposta:</h4>
                    <Textarea
                      value={responses[evaluation.id] || ''}
                      onChange={(e) => handleResponseChange(evaluation.id, e.target.value)}
                      placeholder="Digite sua resposta para o aluno..."
                      className="min-h-[100px] rounded-xl border-slate-200 focus:border-indigo-900 focus:ring-indigo-900"
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => handleSendResponse(evaluation.id)}
                        className="rounded-xl bg-gradient-to-r from-indigo-900 to-purple-800 hover:from-indigo-800 hover:to-purple-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Resposta
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
