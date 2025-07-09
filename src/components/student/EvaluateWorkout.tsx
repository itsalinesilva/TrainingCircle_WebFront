
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, MessageSquare, Clock, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

interface User {
  id: string;
  email: string;
  type: 'student' | 'trainer';
  name: string;
  personalTrainer?: string;
  totalStudents?: number;
  avatar?: string;
}

interface Workout {
  id: string;
  name: string;
  date: string;
  completed: boolean;
  // Adicione outras propriedades conforme necessário
}

interface EvaluateWorkoutProps {
  user: User;
  workout: Workout | null;
  onBack: () => void;
}

const recentWorkouts = [
  { id: 1, name: "Treino de Força A", date: "2024-01-15", completed: true },
  { id: 2, name: "Treino de Força B", date: "2024-01-14", completed: true },
  { id: 3, name: "Treino Cardio", date: "2024-01-13", completed: true },
];

const feedbackHistory = [
  {
    id: 1,
    workoutName: "Treino de Força A",
    date: "2024-01-10",
    rating: 4,
    feedback: "Treino muito bom, senti que poderia ter mais peso no supino.",
    trainerResponse: "Obrigado pelo feedback! Vamos aumentar a carga na próxima sessão.",
    status: "Respondido"
  },
  {
    id: 2,
    workoutName: "Treino Cardio",
    date: "2024-01-08",
    rating: 5,
    feedback: "Excelente treino, me senti muito bem!",
    trainerResponse: null,
    status: "Aguardando resposta"
  }
];

export function EvaluateWorkout({ onBack }: EvaluateWorkoutProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);
  const [pseLevel, setPseLevel] = useState<number>(5);
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  // Níveis PSE com cores e descrições atualizadas
  const pseLevels = [
    { level: 1, color: 'bg-blue-200', intensity: 'Muito leve', description: 'Esforço mínimo, muito fácil de realizar' },
    { level: 2, color: 'bg-blue-400', intensity: 'Leve', description: 'Esforço muito leve, fácil de manter' },
    { level: 3, color: 'bg-blue-400', intensity: 'Leve', description: 'Esforço leve, confortável' },
    { level: 4, color: 'bg-green-500', intensity: 'Moderada', description: 'Esforço moderado, começa a desafiar' },
    { level: 5, color: 'bg-green-500', intensity: 'Moderada', description: 'Esforço moderado, respiração mais ofegante' },
    { level: 6, color: 'bg-green-500', intensity: 'Moderada', description: 'Esforço moderado, desafiador' },
    { level: 7, color: 'bg-yellow-400', intensity: 'Vigoroso', description: 'Esforço forte, respiração ofegante' },
    { level: 8, color: 'bg-yellow-400', intensity: 'Vigoroso', description: 'Esforço muito forte, próximo ao limite' },
    { level: 9, color: 'bg-orange-500', intensity: 'Difícil', description: 'Esforço intenso, muito desafiador' },
    { level: 10, color: 'bg-red-600', intensity: 'Máximo', description: 'Esforço máximo, exaustão total' }
  ];
  
  // Função para obter a cor baseada no nível
  const getColorForLevel = (level: number) => {
    if (level === 1) return 'bg-blue-200';
    if (level === 2 || level === 3) return 'bg-blue-400';  // Mesmo azul para níveis 2 e 3
    if (level >= 4 && level <= 6) return 'bg-green-500';    // Mesmo verde para níveis 4-6
    if (level === 7 || level === 8) return 'bg-yellow-400'; // Mesmo amarelo para níveis 7-8
    if (level === 9) return 'bg-orange-500';
    return 'bg-red-600';  // Nível 10
  };
  
  // Função para obter a faixa de intensidade
  const getIntensityRange = (level: number) => {
    if (level === 1) return '1 Muito leve';
    if (level === 2) return '2 Leve';
    if (level === 3) return '3 Azul leve';
    if (level >= 4 && level <= 6) return `${level} Moderada`;
    if (level === 7 || level === 8) return `${level} Vigoroso`;
    if (level === 9) return '9 Difícil';
    return '10 Máximo';
  };
  
  // Função para obter a cor da faixa
  const getRangeColor = (level: number) => {
    if (level === 1) return 'bg-blue-100 text-blue-800';
    if (level === 2 || level === 3) return 'bg-blue-200 text-blue-900';  // Mesmo azul para níveis 2 e 3
    if (level >= 4 && level <= 6) return 'bg-green-200 text-green-900';  // Mesmo verde para níveis 4-6
    if (level === 7 || level === 8) return 'bg-yellow-100 text-yellow-900'; // Mesmo amarelo para níveis 7-8
    if (level === 9) return 'bg-orange-100 text-orange-900';
    return 'bg-red-100 text-red-900';
  };

  // Função auxiliar para obter o nível PSE atual
  const getCurrentPse = (level: number) => pseLevels[level - 1] || pseLevels[0];

  const handleSubmitEvaluation = () => {
    if (!selectedWorkout) {
      toast({
        title: "Selecione um treino",
        description: "Por favor, selecione um treino para avaliar.",
        variant: "destructive",
      });
      return;
    }

    if (pseLevel < 1 || pseLevel > 10) {
      toast({
        title: "Avaliação necessária",
        description: "Por favor, selecione um nível de esforço de 1 a 10.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Avaliação enviada!",
      description: "Sua avaliação foi enviada com sucesso para seu personal trainer.",
    });

    setSelectedWorkout(null);
    setPseLevel(5);
    setFeedback("");
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
          <h1 className="text-3xl font-bold text-slate-800">Avaliar Treino</h1>
          <p className="text-slate-600 mt-1">Compartilhe sua experiência com o treino</p>
        </div>
      </div>

      {/* Workout Selection */}
      <Card className="border-0 shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Selecione o Treino para Avaliar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentWorkouts.map((workout) => (
              <div
                key={workout.id}
                onClick={() => setSelectedWorkout(workout.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedWorkout === workout.id
                    ? 'border-indigo-900 bg-indigo-50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">{workout.name}</h3>
                    <p className="text-sm text-slate-600">
                      Realizado em {new Date(workout.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-900 flex items-center justify-center">
                    {selectedWorkout === workout.id && (
                      <div className="w-2 h-2 rounded-full bg-indigo-900"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PSE Rating Section */}
      {selectedWorkout && (
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-700" />
              Percepção subjetiva de esforço (PSE)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <div className="mb-6 text-center">
                  <div className="text-3xl font-bold mb-2">{pseLevel}<span className="text-lg text-slate-500">/10</span></div>
                  <div className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${getRangeColor(pseLevel)}`}>
                    {getIntensityRange(pseLevel)}
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-lg font-medium text-center mb-1">
                    {getCurrentPse(pseLevel).intensity}
                  </p>
                  <p className="text-sm text-slate-600 text-center">
                    {getCurrentPse(pseLevel).description}
                  </p>
                </div>
                
                <div className="mb-6 px-2">
                  {/* Barra de cores clicável */}
                  <div className="flex justify-between cursor-pointer">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
                      <div 
                        key={level}
                        onClick={() => setPseLevel(level)}
                        className={`h-10 flex-1 flex items-center justify-center text-xs font-medium transition-all ${
                          level <= pseLevel 
                            ? getColorForLevel(level) + ' text-white'
                            : 'bg-slate-200 text-slate-400'
                        } ${level === 1 ? 'rounded-l-full' : ''} ${level === 10 ? 'rounded-r-full' : ''}`}
                      >
                        {level}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Comentários (opcional)
              </label>
              <Textarea
                placeholder="Compartilhe sua experiência, dificuldades ou sugestões sobre o treino..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[120px] rounded-xl border-slate-200 focus:border-indigo-900 focus:ring-indigo-900"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      {selectedWorkout && pseLevel > 0 && (
        <div className="flex justify-center mb-8">
              <Button
                onClick={handleSubmitEvaluation}
                className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-6 text-base shadow-md hover:shadow-lg transition-all"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Nível de Esforço
              </Button>
        </div>
      )}

      {/* Feedback History */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-900" />
            Histórico de Avaliações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbackHistory.map((item) => (
              <div key={item.id} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.workoutName}</h4>
                    <p className="text-sm text-slate-600">
                      {new Date(item.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-1">PSE:</span>
                      <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        item.rating <= 3 ? 'bg-blue-100 text-blue-800' :
                        item.rating <= 6 ? 'bg-green-100 text-green-800' :
                        item.rating <= 8 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.rating}/10
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      item.status === 'Respondido' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status === 'Respondido' ? <MessageSquare className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {item.status}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-3">{item.feedback}</p>
                {item.trainerResponse && (
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-indigo-900 mb-1">Resposta do Personal:</p>
                    <p className="text-sm text-indigo-800">{item.trainerResponse}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
