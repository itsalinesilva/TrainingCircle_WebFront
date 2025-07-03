
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Send, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      <div className="space-y-4 sm:space-y-6">
        {evaluations.map((evaluation) => {
          const isJustResponded = respondedEvaluations.includes(evaluation.id);
          const hasResponse = evaluation.responded || isJustResponded;
          
          return (
            <Card key={evaluation.id} className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="font-semibold text-indigo-900">
                        {evaluation.student.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{evaluation.student}</h3>
                      <p className="text-sm text-slate-600">{evaluation.workout}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(evaluation)}
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= evaluation.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 ml-2">
                        {new Date(evaluation.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-slate-700 mb-2">Comentário do aluno:</p>
                    <p className="text-slate-800">{evaluation.comment}</p>
                  </div>

                  {(evaluation.response || isJustResponded) && (
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-indigo-900 mb-2">Sua resposta:</p>
                      <p className="text-indigo-800">{evaluation.response}</p>
                    </div>
                  )}

                  {!hasResponse && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700">
                        Sua resposta:
                      </label>
                      <Textarea
                        placeholder="Digite sua resposta para o aluno..."
                        value={responses[evaluation.id] || ""}
                        onChange={(e) => handleResponseChange(evaluation.id, e.target.value)}
                        className="min-h-[100px] rounded-xl border-slate-200 focus:border-indigo-900 focus:ring-indigo-900"
                      />
                      <Button
                        onClick={() => handleSendResponse(evaluation.id)}
                        className="rounded-xl bg-gradient-to-r from-indigo-900 to-purple-800 hover:from-indigo-800 hover:to-purple-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Resposta
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
